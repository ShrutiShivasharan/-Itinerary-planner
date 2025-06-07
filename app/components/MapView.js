export default function MapView() {
  return (
    <div className="h-full w-full">
      <iframe
        title="Map"
        className="w-full h-[600px]"
        src="https://maps.google.com/maps?q=delhi&t=&z=13&ie=UTF8&iwloc=&output=embed"
        allowFullScreen
      ></iframe>
    </div>
  );
}
