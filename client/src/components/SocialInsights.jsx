import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, AlertTriangle, Zap, Info } from "lucide-react";

const baseUrl = import.meta.env.VITE_BASEURL;

export function SocialInsights() {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        // Replace with axios if you prefer, but fetch works fine
        const response = await fetch(`${baseUrl}/api/news/disasters`);
        const data = await response.json();
        
        if (data && data.disasters) {
          console.log(data);
          setInsights(data.disasters);
        }
      } catch (err) {
        console.error("Failed to fetch insights:", err);
        setInsights([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  // Function to determine the severity based on title content
  const getSeverity = (title, description) => {
    const text = (title + ' ' + description).toLowerCase();
    if (text.includes('killed') || text.includes('death') || text.includes('alert') || text.includes('evacuated')) {
      return 'high';
    } else if (text.includes('flood') || text.includes('earthquake') || text.includes('landslide')) {
      return 'medium';
    }
    return 'low';
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="w-3 h-3" />;
      case 'medium': return <Zap className="w-3 h-3" />;
      default: return <Info className="w-3 h-3" />;
    }
  };

  return (
    <Card className="p-4 bg-white border-0 rounded-2xl shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-800 font-medium">Disaster & News Insights</h3>
        <MessageSquare className="w-5 h-5 text-blue-600" />
      </div>

      {loading ? (
        <p className="text-gray-500 text-sm">Loading latest updates...</p>
      ) : insights.length > 0 ? (
        <ScrollArea className="h-64">
          <div className="space-y-2">
            {insights.map((item, index) => {
              const severity = getSeverity(item.title, item.description);
              return (
                <div
                  key={index}
                  className={`flex items-start gap-3 p-3 rounded-xl ${
                    severity === 'high'
                      ? "bg-red-50 border-l-2 border-red-500"
                      : severity === 'medium'
                      ? "bg-orange-50 border-l-2 border-orange-500"
                      : "bg-blue-50 border-l-2 border-blue-500"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs ${
                      severity === 'high'
                        ? "bg-red-600"
                        : severity === 'medium'
                        ? "bg-orange-600"
                        : "bg-blue-600"
                    }`}
                  >
                    {getSeverityIcon(severity)}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-800 mb-1 line-clamp-2">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-400">
                        {item.source} • {item.date}
                      </p>
                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 text-xs underline hover:text-blue-800"
                        >
                          Read more
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      ) : (
        <p className="text-gray-500 text-sm">No insights available.</p>
      )}
    </Card>
  );
}