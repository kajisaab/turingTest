/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from 'react';
import HeaderSection from '../../Component/HeaderSection';
import './UserCategory.css';
import useApi from '../../hooks/useApi';
import Pagination from '../../Pagination/Pagination';
import { useNavigate } from 'react-router-dom';

interface RequestPayloadInterface {
    pathVariable: null | Record<string, string | number>;
    requestParameter: null | Record<string, string | number>;
    endpoint: string;
}

const initialRequestPayload = {
    endpoint: 'https://dummyjson.com/users',
    pathVariable: null,
    requestParameter: {
        skip: 0,
        limit: 100,
    },
};

function UserCategory() {
    const [requestPayload, setRequestPayload] =
        useState<RequestPayloadInterface>({
            ...initialRequestPayload,
        });
    const [paginationValue, setPaginationValue] = useState({
        limit: 10,
        skip: 0,
        total: 0,
    });
    const [userDetails, setUserDetails] = useState<any[]>([]);
    const navigate = useNavigate();
    const { loading } = useApi({
        endpoint: requestPayload.endpoint,
        queryParameter: requestPayload.requestParameter,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSuccess: (res: any) => {
            if (res) {
                setRequestPayload({
                    ...requestPayload,
                    requestParameter: null,
                });
                setPaginationValue({
                    ...paginationValue,
                    total: res.total,
                });
                setUserDetails([...res.users]);
            }
        },
    });

    const userList = useMemo(() => {
        return userDetails.slice(
            paginationValue.skip * 10,
            (paginationValue.skip + 1) * 10
        );
    }, [userDetails, paginationValue.skip]);

    return (
        <section className='user__category__page__wrapper'>
            <HeaderSection />
            <div className='user__category__wrapper'>
                {!loading ? (
                    <div className='user__category__container'>
                        {userList.map((userData: any) => (
                            <div
                                key={userData.id}
                                className='user__category'
                                onClick={() => navigate(`/user/${userData.id}`)}
                            >
                                <div className='user__category__img__container'>
                                    <img src={userData.image} alt='user' />
                                </div>
                                <div className='user__category__detail__container'>
                                    <div className='name__container'>
                                        {userData.firstName}
                                        {userData.lastName}
                                    </div>
                                    <span>Address : {userData.macAddress}</span>
                                    <span>Phone : {userData.phone}</span>
                                    <span>
                                        University : {userData.university}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>Loading</div>
                )}
            </div>
            <Pagination
                className='pagination-bar'
                currentPage={paginationValue.skip + 1}
                pageSize={paginationValue.limit}
                totalCount={paginationValue.total}
                onPageChange={(pageNumber: any) => {
                    setPaginationValue({
                        ...paginationValue,
                        skip: pageNumber - 1,
                    });
                }}
            />
        </section>
    );
}

export default UserCategory;
