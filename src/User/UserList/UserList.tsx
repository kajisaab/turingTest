import { useState } from 'react';
import HeaderSection from '../../Component/HeaderSection';
import useApi from '../../hooks/useApi';
import './UserList.css';

interface RequestPayloadInterface {
    pathVariable: null | Record<string, string | number>;
    requestParameter: null | Record<string, string | number>;
    endpoint: string;
}

function UserList() {
    const [requestPayload, setRequestPayload] =
        useState<RequestPayloadInterface>({
            endpoint: 'https://dummyjson.com/users',
            pathVariable: null,
            requestParameter: {
                skip: 0,
                limit: 20,
            },
        });
    const { response } = useApi({
        endpoint: requestPayload.endpoint,
        queryParameter: requestPayload.requestParameter,
        onSuccess: (res: unknown) => {
            if (res) {
                setRequestPayload({
                    ...requestPayload,
                    requestParameter: null,
                });
            }
        },
    });
    let userDetails: Record<string, string | number | unknown>[] = [];
    if (response) {
        const { users } = response;
        userDetails = users;
    }
    console.log({ userDetails });
    return (
        <section className='user__page__wrapper'>
            <HeaderSection />
            <div className='user__search__table__wrapper'>
                <input type='text' />
            </div>
            <div className='user__table__wrapper__container'>
                <div className='user__table__wrapper'></div>
                <span>working</span>
            </div>
        </section>
    );
}

export default UserList;
