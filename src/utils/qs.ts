import type { ParsedQs } from "qs";

export function filterQueryParams(
	query: ParsedQs,
	fields: string[],
): Record<string, string | Record<string, string>> {
	if (!Array.isArray(fields)) {
		throw new Error('The "fields" argument must be an array of strings.');
	}

	const filteredParams: Record<string, string | Record<string, string>> = {};

	for (const field of fields) {
		const value = query[field];

		if (shouldIncludeParam(value)) {
			filteredParams[field] = filterValue(value);
		}
	}

	return filteredParams;
}

function shouldIncludeParam(value: unknown): boolean {
	// Exclude empty, null, undefined, 'null', 'undefined' values
	return (
		value !== "" &&
		value !== null &&
		value !== undefined &&
		value !== "undefined" &&
		!isEmptyObject(value)
	);
}

function filterValue(value: unknown): string | Record<string, string> {
	if (isObject(value)) {
		return filterNestedQueryParams(value);
	}

	if (typeof value === "string") {
		return value;
	}
	return {};
}

function filterNestedQueryParams(value: ParsedQs): Record<string, string> {
	const allowedKeys = ["gte", "gt", "lte", "lt"];

	if (isObject(value)) {
		return Object.keys(value).reduce(
			(filtered, key) => {
				const fieldValue = value[key];

				if (
					allowedKeys.includes(key) &&
					typeof fieldValue === "string" &&
					fieldValue !== ""
				) {
					filtered[key] = fieldValue;
				}

				return filtered;
			},
			{} as Record<string, string>,
		);
	}

	return {};
}

function isObject(
	value: unknown,
): value is Record<string, string | Record<string, string>> {
	return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isEmptyObject(value: unknown): boolean {
	return isObject(value) && Object.keys(value).length === 0;
}
