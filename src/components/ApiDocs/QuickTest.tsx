import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Play, CheckCircle, XCircle } from "lucide-react";

export const QuickTest = () => {
  const [apiKey, setApiKey] = useState("");
  const [testUrl, setTestUrl] = useState("https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC");
  const [endpoint, setEndpoint] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [statusCode, setStatusCode] = useState(null);
  const { toast } = useToast();

  const testEndpoint = async () => {
    if (!apiKey || !testUrl || !endpoint) {
      toast({
        title: "Missing fields",
        description: "Please fill in API key, URL, and select an endpoint",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResponse(null);
    setStatusCode(null);
    
    try {
      const params = new URLSearchParams({
        api_key: apiKey,
        url: testUrl
      });

      const apiResponse = await fetch(`https://tgmusic.fallenapi.fun/${endpoint}?${params}`);
      const responseData = await apiResponse.json();
      
      setStatusCode(apiResponse.status);
      setResponse(responseData);
      
      if (apiResponse.ok) {
        toast({
          title: "Success!",
          description: `API call completed with status ${apiResponse.status}`,
        });
      } else {
        toast({
          title: "API Error",
          description: `Request failed with status ${apiResponse.status}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Network Error",
        description: "Failed to connect to the API",
        variant: "destructive",
      });
      setStatusCode(0);
      setResponse({ error: "Network error occurred" });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    if (status >= 200 && status < 300) return "text-green-600";
    if (status >= 400 && status < 500) return "text-yellow-600";
    if (status >= 500) return "text-red-600";
    return "text-gray-600";
  };

  const getStatusIcon = (status) => {
    if (status >= 200 && status < 300) return <CheckCircle className="w-4 h-4 text-green-600" />;
    return <XCircle className="w-4 h-4 text-red-600" />;
  };

  return (
    <section className="py-8 sm:py-12 bg-gradient-accent">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4">
            <Play className="w-3 h-3 mr-1" />
            API Tester
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Test API Endpoints</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Test the API endpoints directly and see real responses
          </p>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>API Endpoint Tester</CardTitle>
            <CardDescription>
              Enter your API key, select an endpoint, and provide a URL to test
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <Input
                  id="api-key"
                  type="password"
                  placeholder="Enter your API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endpoint">Endpoint</Label>
                <Select value={endpoint} onValueChange={setEndpoint}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an endpoint" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="get_track">get_track - Get track info</SelectItem>
                    <SelectItem value="get_url">get_url - Get track list</SelectItem>
                    <SelectItem value="snap">snap - Download media</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="test-url">Test URL</Label>
              <Input
                id="test-url"
                placeholder="https://open.spotify.com/track/..."
                value={testUrl}
                onChange={(e) => setTestUrl(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Try URLs from Spotify, Instagram, Twitter, Threads, etc.
              </p>
            </div>

            <Button 
              onClick={testEndpoint} 
              disabled={isLoading || !apiKey || !testUrl || !endpoint}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Testing API...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Test Endpoint
                </>
              )}
            </Button>

            {statusCode !== null && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  {getStatusIcon(statusCode)}
                  <span className={`font-medium ${getStatusColor(statusCode)}`}>
                    Status: {statusCode}
                  </span>
                </div>
                
                {response && (
                  <div className="space-y-2">
                    <Label>Response</Label>
                    <div className="bg-muted rounded-lg p-4 max-h-96 overflow-auto">
                      <pre className="text-xs font-mono whitespace-pre-wrap">
                        {JSON.stringify(response, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};