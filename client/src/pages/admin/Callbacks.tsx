import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Calendar, MessageSquare, User, ArrowLeft, Building2, Trash2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

export default function AdminCallbacks() {
    const { token } = useAuth();
    const { toast } = useToast();

    const { data: submissions, isLoading } = useQuery<any[]>({
        queryKey: ["callbackSubmissions"],
        queryFn: async () => {
            const headers: HeadersInit = {};
            if (token) {
                headers["Authorization"] = `Bearer ${token}`;
            }
            const res = await fetch("/api/callbacks", { headers });
            if (!res.ok) throw new Error("Failed to fetch");
            return res.json();
        },
        enabled: !!token,
    });

    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: async (id: number) => {
            const res = await fetch(`/api/callbacks/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (!res.ok) throw new Error("Failed to delete");
            return res.json();
        },
        onSuccess: (_, id) => {
            queryClient.setQueryData(["callbackSubmissions"], (old: any[]) => old?.filter(item => item.id !== id));
            queryClient.invalidateQueries({ queryKey: ["callbackSubmissions"] });
            toast({
                title: "Deleted",
                description: "Callback request has been deleted.",
            });
        },
        onError: () => {
            toast({
                title: "Error",
                description: "Failed to delete request.",
                variant: "destructive",
            });
        }
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/admin">
                                <Button variant="outline" size="icon">
                                    <ArrowLeft className="h-4 w-4" />
                                </Button>
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Callback Requests</h1>
                                <p className="text-gray-600">Manage customer callback submissions</p>
                            </div>
                        </div>
                        <span className="bg-emerald-100 text-emerald-700 text-sm px-3 py-1 rounded-full font-medium">
                            {submissions?.length || 0} Total
                        </span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-8 py-8">
                {isLoading ? (
                    <Card>
                        <CardContent className="h-48 flex items-center justify-center">
                            <p className="text-gray-500">Loading submissions...</p>
                        </CardContent>
                    </Card>
                ) : !submissions || submissions.length === 0 ? (
                    <Card className="border-dashed border-gray-300">
                        <CardContent className="h-48 flex flex-col items-center justify-center">
                            <MessageSquare className="h-12 w-12 text-gray-300 mb-3" />
                            <p className="text-gray-500 italic">No callback submissions yet.</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-6">
                        {submissions.map((sub) => (
                            <Card key={sub.id} className="hover:shadow-md transition-shadow">
                                <CardHeader className="bg-gray-50 border-b">
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-lg font-bold flex items-center gap-2">
                                            <User className="h-5 w-5 text-emerald-600" />
                                            {sub.name}
                                        </CardTitle>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs text-gray-400">ID: #{sub.id}</span>
                                            <a href={`tel:${sub.phone}`}>
                                                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                                                    <Phone className="mr-2 h-4 w-4" />
                                                    Call Now
                                                </Button>
                                            </a>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => {
                                                    if (confirm('Are you sure you want to delete this callback request?')) {
                                                        deleteMutation.mutate(sub.id);
                                                    }
                                                }}
                                                disabled={deleteMutation.isPending}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3 text-sm">
                                                <Phone className="h-4 w-4 text-gray-400" />
                                                <span className="text-gray-600 font-medium">{sub.phone}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm">
                                                <Mail className="h-4 w-4 text-gray-400" />
                                                <a href={`mailto:${sub.email}`} className="text-emerald-600 hover:underline">
                                                    {sub.email}
                                                </a>
                                            </div>
                                            {sub.city && (
                                                <div className="flex items-center gap-3 text-sm">
                                                    <MapPin className="h-4 w-4 text-gray-400" />
                                                    <span className="text-gray-600">{sub.city}</span>
                                                </div>
                                            )}
                                            {sub.company && (
                                                <div className="flex items-center gap-3 text-sm">
                                                    <Building2 className="h-4 w-4 text-gray-400" />
                                                    <span className="text-gray-600">{sub.company}</span>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-3 text-sm">
                                                <Calendar className="h-4 w-4 text-gray-400" />
                                                <span className="text-gray-500">
                                                    {format(new Date(sub.createdAt), "PPp")}
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex gap-2 mb-2">
                                                <MessageSquare className="h-4 w-4 text-emerald-500 mt-1" />
                                                <p className="text-xs font-semibold uppercase text-gray-400 tracking-wider">
                                                    Requirement
                                                </p>
                                            </div>
                                            <p className="text-sm text-gray-600 leading-relaxed border-l-2 border-emerald-100 pl-3">
                                                {sub.requirement}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
