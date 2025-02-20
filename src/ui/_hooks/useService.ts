import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

interface QueryOptions<Data> {
	onSuccess?: (data: Data) => void;
	onError?: (error: Error) => void;
	quietly?: boolean;
	enabled?: boolean;
	cacheTime?: number;
	refetchInterval?: number;
}

export const useQueryService = <Data>(
	key: string,
	deps: any[],
	service: () => Promise<Data>,
	options: QueryOptions<Data> = {},
) => {
	const query = useQuery<Data, Error>([key, ...deps], service, {
		enabled: options.enabled ?? true,
		retry: false,
		refetchInterval: options.refetchInterval ?? false,
	});

	useEffect(() => {
		if (query.isSuccess) {
			options.onSuccess?.(query.data!);
		}
		if (query.isError && !options.quietly) {
			options.onError?.(query.error);
		}
	}, [query.data, query.isError, query.isSuccess]);

	return {
		data: query.data,
		refetch: query.refetch,
		isLoading: query.isLoading,
	};
};

interface MutationOptions<Data, Arguments, Actions> {
	onSuccess?: (data: Data, args?: Arguments) => void;
	onFinished?: (actions: Actions, args: Arguments) => void;
	onError?: (error: Error) => void;
}

export const useMutationService = <
	Arguments = void,
	Data = void,
	Actions = void,
>(
	service: (args: Arguments) => Promise<Data>,
	options: MutationOptions<Data, Arguments, Actions> = {},
) => {
	const { mutate, ...rest } = useMutation<
		Data,
		Error,
		{ args: Arguments; actions: Actions }
	>((variables) => service(variables.args), {
		retry: false,
		cacheTime: 0,
		onSuccess: (data, variables) => options.onSuccess?.(data, variables.args),
		onSettled: (data, error, variables) =>
			options.onFinished?.(variables.actions, variables.args),
		onError: (error) => options.onError?.(error),
	});

	return {
		...rest,
		mutate: (args: Arguments, actions: Actions) => mutate({ args, actions }),
	};
};
