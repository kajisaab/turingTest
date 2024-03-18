import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useApi from '../../hooks/useApi';

function IndividualUserDetails() {
    const parameter = useParams();

    const [requestPayload, setRequestPayload] = useState<
        Record<string, string | null>
    >({
        endpoint: `https://dummyjson.com/users/${parameter.id}`,
    });

    const { response, loading } = useApi({
        endpoint: requestPayload.endpoint,
        onSuccess: (response) => {
            console.log({ response });
            setRequestPayload({
                endpoint: null,
            });
        },
    });

    console.log({ response });
    return !loading ? (
        <div>{JSON.stringify(response)}</div>
    ) : (
        <div>loading</div>
    );
}

export default IndividualUserDetails;
