import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Calendar, MessageSquare, User, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";

export default function CallbackSubmissions() {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        loop: false,
        containScroll: "trimSnaps"
    });

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const { data: submissions, isLoading } = useQuery<any[]>({
        queryKey: ["callbackSubmissions"],
        queryFn: async () => {
            const res = await fetch("/api/inquiries");
            if (!res.ok) throw new Error("Failed to fetch");
            return res.json();
        },
    });

    if (isLoading) {
        return (
            <Card className="mb-8">
                <CardContent className="h-48 flex items-center justify-center">
                    <p className="text-gray-500">Loading submissions...</p>
                </CardContent>
            </Card>
        );
    }

    if (!submissions || submissions.length === 0) {
        return (
            <Card className="mb-8 border-dashed border-gray-300">
                <CardContent className="h-48 flex items-center justify-center">
                    <p className="text-gray-500 italic">No callback submissions yet.</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    Request Callback Submissions
                    <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full">
                        {submissions.length} New
                    </span>
                </h2>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={scrollPrev}
                        className="rounded-full"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={scrollNext}
                        className="rounded-full"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-6 -ml-6">
                    {submissions.map((sub) => (
                        <div key={sub.id} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-6">
                            <Card className="h-full hover:shadow-md transition-shadow">
                                <CardHeader className="bg-gray-50 border-b py-4">
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-lg font-bold flex items-center gap-2">
                                            <User className="h-4 w-4 text-emerald-600" />
                                            {sub.name}
                                        </CardTitle>
                                        <span className="text-[10px] text-gray-400 font-normal">
                                            ID: #{sub.id}
                                        </span>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6 space-y-4">
                                    <div className="grid grid-cols-1 gap-3">
                                        <div className="flex items-center gap-3 text-sm">
                                            <Phone className="h-4 w-4 text-gray-400" />
                                            <span className="text-gray-600 font-medium">{sub.phone}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm">
                                            <Mail className="h-4 w-4 text-gray-400" />
                                            <span className="text-gray-600 truncate">{sub.email}</span>
                                        </div>
                                        {sub.city && (
                                            <div className="flex items-center gap-3 text-sm">
                                                <MapPin className="h-4 w-4 text-gray-400" />
                                                <span className="text-gray-600">{sub.city}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-3 text-sm">
                                            <Calendar className="h-4 w-4 text-gray-400" />
                                            <span className="text-gray-500">
                                                {format(new Date(sub.createdAt), "PPp")}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t">
                                        <div className="flex gap-2 mb-2">
                                            <MessageSquare className="h-4 w-4 text-emerald-500 mt-1" />
                                            <p className="text-xs font-semibold uppercase text-gray-400 tracking-wider">
                                                Requirement
                                            </p>
                                        </div>
                                        <p className="text-sm text-gray-600 line-clamp-4 leading-relaxed italic border-l-2 border-emerald-100 pl-3">
                                            "{sub.message}"
                                        </p>
                                    </div>

                                    <div className="pt-4">
                                        <a href={`tel:${sub.phone}`} className="w-full block">
                                            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 shadow-sm font-semibold">
                                                <Phone className="mr-2 h-4 w-4" />
                                                Call Now
                                            </Button>
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
