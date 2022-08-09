// ======== IResponse

export interface IResponse {
	status: number;
	success: boolean;
	message: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	results?: any
}