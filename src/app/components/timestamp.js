export default function Timestamp({ time }) {
    const pad = (num) => num.toString().padStart(2, '0');
    return (
        <p className="text-white font-bold">
            {(() => {
                const minutes = Math.floor(time / 60000);
                const seconds = Math.floor((time % 60000) / 1000);
                return `${pad(minutes)}:${pad(seconds)}`;
            })()}
        </p>
    )
}