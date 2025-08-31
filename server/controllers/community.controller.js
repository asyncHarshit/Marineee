import CommunityPost from "../models/Community.model.js";
import User from "../models/User.model.js";

// Get all posts with search functionality
export const getPosts = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { content: { $regex: search, $options: "i" } },
          { "location.address": { $regex: search, $options: "i" } },
        ],
      };
    }

    const posts = await CommunityPost.find(query)
      .populate("author", "name email")
      .populate("comments.author", "name")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new post
export const createPost = async (req, res) => {
  try {
    const { title, content, postType, location } = req.body;
    const authorId = req.user?.id || req.body.author; // Use authenticated user or fallback
    console.log(authorId);
    
    const post = new CommunityPost({
      author: authorId,
      title,
      content,
      postType,
      location,
    });

    await post.save();

    // Award points to user
    const points = postType === "discussion" ? 2 : 3;
    await User.findByIdAndUpdate(authorId, {
      $inc: { points: points },
    });

    const populatedPost = await CommunityPost.findById(post._id).populate(
      "author",
      "name email"
    );

    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Like/Unlike post
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id || req.body.userId; // Use authenticated user or fallback

    const post = await CommunityPost.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      post.likes = post.likes.filter((like) => like.toString() !== userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();

    const populatedPost = await CommunityPost.findById(id)
      .populate("author", "name email")
      .populate("comments.author", "name");

    res.json(populatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add comment
export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user?.id || req.body.userId; // Use authenticated user or fallback

    const post = await CommunityPost.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.comments.push({
      author: userId,
      content,
    });

    await post.save();

    const populatedPost = await CommunityPost.findById(id)
      .populate("author", "name email")
      .populate("comments.author", "name");

    res.json(populatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Share post
export const sharePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await CommunityPost.findByIdAndUpdate(
      id,
      { $inc: { shares: 1 } },
      { new: true }
    )
      .populate("author", "name email")
      .populate("comments.author", "name");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get community stats
export const getCommunityStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const postsThisWeek = await CommunityPost.countDocuments({
      createdAt: { $gte: oneWeekAgo },
    });

    const topContributors = await User.countDocuments({
      points: { $gte: 100 }, // Gold contributors with 100+ points
    });

    res.json({
      activeMembers: totalUsers,
      postsThisWeek,
      topContributors,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user's recent activity
export const getUserActivity = async (req, res) => {
  try {
    const userId = req.user?.id || req.params.userId;

    const userPosts = await CommunityPost.find({ author: userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("author", "name");

    const userComments = await CommunityPost.find({ "comments.author": userId })
      .sort({ "comments.createdAt": -1 })
      .limit(5)
      .populate("author", "name")
      .populate("comments.author", "name");

    const activity = [
      ...userPosts.map((post) => ({
        type: "post",
        action: "posted",
        target: post.title,
        time: post.createdAt,
        user: post.author.name,
      })),
      ...userComments.flatMap((post) =>
        post.comments
          .filter((comment) => comment.author._id.toString() === userId)
          .map((comment) => ({
            type: "comment",
            action: "commented on",
            target: post.title,
            time: comment.createdAt,
            user: comment.author.name,
          }))
      ),
    ]
      .sort((a, b) => new Date(b.time) - new Date(a.time))
      .slice(0, 5);

    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user points/rank
export const getUserRank = async (req, res) => {
  try {
    const userId = req.user?.id || req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userPosts = await CommunityPost.countDocuments({ author: userId });

    let rank = "Bronze Contributor";
    if (user.points >= 200) rank = "Platinum Contributor";
    else if (user.points >= 100) rank = "Gold Contributor";
    else if (user.points >= 50) rank = "Silver Contributor";

    res.json({
      points: user.points || 0,
      rank,
      postsCount: userPosts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
