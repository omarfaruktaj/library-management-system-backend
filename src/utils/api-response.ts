interface Pagination {
	page: number;
	totalPage: number;
	limit: number;
	next?: number;
	prev?: number;
	total: number;
}

class APIResponse<T> {
	constructor(
		public success: boolean,
		public status: number,
		public message: string,
		public data?: T,
		public pagination?: Pagination,
	) {}
}

export default APIResponse;
