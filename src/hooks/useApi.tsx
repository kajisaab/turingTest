/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
interface apiProps {
    endpoint: string;
    pathVariable?: null | Record<string, string | number>;
    queryParameter?: null | Record<string, string | number>;
    onSuccess: (response: unknown) => void;
    onError?: (err: unknown) => void;
}

function useApi(props: apiProps) {
    const { endpoint, pathVariable, queryParameter, onSuccess, onError } =
        props;

    const [response, setResponse] = useState();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        if (props['pathVariable'] !== undefined && pathVariable === null) {
            return;
        }

        if (props['queryParameter'] !== undefined && queryParameter === null) {
            return;
        }

        const fetchData = async () => {
            let finalEndpoint: string = endpoint;
            setLoading(true);

            if (
                props['pathVariable'] !== undefined &&
                pathVariable &&
                Object.keys(pathVariable).length > 0
            ) {
                finalEndpoint += '/';
                finalEndpoint += Object.values(pathVariable).join('/');
            }

            if (
                props['queryParameter'] &&
                queryParameter &&
                Object.keys(queryParameter).length > 0
            ) {
                const queryString = Object.entries(queryParameter)
                    .map(([key, value]) => `${key}=${value}`)
                    .join('&');
                finalEndpoint += `?${queryString}`;
            }

            try {
                const response = await fetch(finalEndpoint, { signal });
                const data = await response.json();

                if (!signal.aborted) {
                    setResponse(data);
                    onSuccess(data);
                }
            } catch (err) {
                onError && onError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => abortController.abort();
    }, [endpoint, pathVariable, queryParameter]);

    return {
        response,
        loading,
    };
}

export default useApi;
