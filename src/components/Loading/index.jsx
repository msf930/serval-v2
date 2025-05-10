export default function Loading() {
    return (
        <div className="inset-0 flex items-center justify-center bg-white z-[10000] h-[100vh] w-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500" />
            <p className="text-black">Test</p>
        </div>
    );
}