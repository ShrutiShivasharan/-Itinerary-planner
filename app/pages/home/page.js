import ItineraryCard from "@/app/components/ItineraryCard";
import MapView from "@/app/components/MapView";


export default function Page() {
    return (
        <main className="min-h-screen bg-black text-white p-4">
            <h1 className="text-xl mb-4">Default map card</h1>

            <div className="flex flex-col lg:flex-row bg-white rounded-xl overflow-hidden">
                {/* Left: Itinerary */}
                <div className="w-full lg:w-1/2 p-4">
                    <ItineraryCard />
                </div>

                {/* Right: Map */}
                <div className="hidden lg:block w-full lg:w-1/2">
                    <MapView />
                </div>
            </div>
        </main>
    );
}
