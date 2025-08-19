import {useState} from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Badge} from "@/components/ui/badge";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import {useToast} from "@/hooks/use-toast";
import {CheckCircle, Loader2, Play, XCircle,} from "lucide-react";

export const QuickTest = () => {
    const [apiKey, setApiKey] = useState("");
    const [testUrl, setTestUrl] = useState(
        "https://open.spotify.com/track/6v8mSl4GZXok3Ebe9x4Jmr?si=92f724a39de84108"
    );
    const [endpoint, setEndpoint] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState<any>(null);
    const [statusCode, setStatusCode] = useState<number | null>(null);
    const {toast} = useToast();

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
                url: testUrl,
            });

            const apiResponse = await fetch(
                `https://tgmusic.fallenapi.fun/${endpoint}?${params}`
            );
            const responseData = await apiResponse.json();

            setStatusCode(apiResponse.status);
            setResponse(responseData);

            toast({
                title: apiResponse.ok ? "Success!" : "API Error",
                description: `Status: ${apiResponse.status}`,
                variant: apiResponse.ok ? "default" : "destructive",
            });
        } catch (error) {
            setStatusCode(0);
            setResponse({error: "Network error occurred"});
            toast({
                title: "Network Error",
                description: "Failed to connect to the API",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const getStatusColor = (status: number | null) => {
        if (!status) return "text-gray-600";
        if (status >= 200 && status < 300) return "text-green-600";
        if (status >= 400 && status < 500) return "text-yellow-600";
        if (status >= 500) return "text-red-600";
        return "text-gray-600";
    };

    const getStatusIcon = (status: number | null) => {
        if (!status) return null;
        if (status >= 200 && status < 300)
            return <CheckCircle className="w-4 h-4 text-green-600"/>;
        return <XCircle className="w-4 h-4 text-red-600"/>;
    };

    return (
        <section className="py-10 sm:py-16 bg-gradient-to-b from-muted/50 to-background">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="text-center mb-10">
                    <Badge variant="secondary" className="mb-3 inline-flex items-center px-2 py-1">
                        <Play className="w-4 h-4 mr-1"/>
                        API Tester
                    </Badge>
                    <h2 className="text-3xl sm:text-4xl font-bold mb-2">Test API Endpoints</h2>
                    <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
                        Enter your credentials and instantly see responses from your selected API.
                    </p>
                </div>

                <Card className="max-w-4xl mx-auto border shadow-md">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold">API Endpoint Tester</CardTitle>
                        <CardDescription>
                            Provide your API key, pick an endpoint, and test it with a sample URL.
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
                                        <SelectValue placeholder="Select an endpoint"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="get_track">get_track — Track Info</SelectItem>
                                        <SelectItem value="get_url">get_url — Track List</SelectItem>
                                        <SelectItem value="snap">snap — Download Media</SelectItem>
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
                                Works with Spotify, Instagram, Twitter, Threads, and more.
                            </p>
                        </div>

                        <Button
                            onClick={testEndpoint}
                            disabled={isLoading || !apiKey || !testUrl || !endpoint}
                            className="w-full"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin"/>
                                    Testing API...
                                </>
                            ) : (
                                <>
                                    <Play className="w-4 h-4 mr-2"/>
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
