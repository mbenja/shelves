import SyncLoader from 'react-spinners/SyncLoader';

export default function LoadingIndicator() {
	return (
		<div className="flex justify-center p-4">
			<SyncLoader color="#c5c5c5" speedMultiplier={0.8} />
		</div>
	);
}
