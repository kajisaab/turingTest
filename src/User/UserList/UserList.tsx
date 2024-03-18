/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo, useState } from 'react';
import HeaderSection from '../../Component/HeaderSection';
import useApi from '../../hooks/useApi';
import './UserList.css';
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
        limit: 10,
    },
};

function UserList() {
    const [requestPayload, setRequestPayload] =
        useState<RequestPayloadInterface>({
            ...initialRequestPayload,
        });
    const [paginationValue, setPaginationValue] = useState({
        limit: 10,
        skip: initialRequestPayload.requestParameter.skip,
        total: 0,
    });
    const [userDetails, setUserDetails] = useState<any[]>([]);

    const navigate = useNavigate();

    const { response, loading } = useApi({
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
        return userDetails;
    }, [userDetails]);

    let debounceTimeout: any;

    const handleInputChange = (event: any) => {
        const query = event.target.value;
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            // Here you can perform your search action, for example, fetching data from an API
            // For demonstration purposes, let's just log the search query
            console.log('Searching for:', query);

            if (query.length > 0) {
                const filteredData = userDetails.filter(
                    ({ firstName, lastName, macAddress, university }) =>
                        `${firstName} ${lastName}`.includes(query) ||
                        macAddress.includes(query) ||
                        university.includes(query)
                );
                setUserDetails([...filteredData]);
                return;
            }
            setUserDetails(response ? [...response['users']] : []);
        }, 1000); // Adjust the debounce delay as needed
    };

    return (
        <section className='user__page__wrapper'>
            <HeaderSection />
            <div className='user__search__table__wrapper'>
                <input type='text' onChange={handleInputChange} />
            </div>
            <div className='user__table__wrapper__container'>
                {!loading ? (
                    <div className='user__table__wrapper'>
                        <table>
                            <thead>
                                <th>S.N</th>
                                <th>User</th>
                                <th>Address</th>
                                <th>Contact</th>
                                <th>University</th>
                            </thead>
                            <tbody>
                                {userList.map((userData: any) => (
                                    <tr
                                        key={userData.id}
                                        onClick={() =>
                                            navigate(`${userData.id}`)
                                        }
                                    >
                                        <td>{userData.id}</td>
                                        <td>
                                            <div className='user__column__section'>
                                                <img
                                                    src={userData.image}
                                                    alt='user'
                                                />
                                                <div className='name__section'>
                                                    {userData.firstName}{' '}
                                                    {userData.lastName}
                                                </div>
                                            </div>
                                        </td>
                                        <td>{userData.macAddress}</td>
                                        <td>{userData.phone}</td>
                                        <td>{userData.university}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div>Loading.....</div>
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
                    setRequestPayload({
                        ...initialRequestPayload,
                        requestParameter: {
                            limit: 10,
                            skip: (pageNumber - 1) * 10,
                        },
                    });
                }}
            />
        </section>
    );
}

export default UserList;
