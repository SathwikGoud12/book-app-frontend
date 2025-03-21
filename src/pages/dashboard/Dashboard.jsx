import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import getBaseUrl from '../../utils/baseURL';
import { MdIncompleteCircle } from 'react-icons/md';
import RevenueChart from './RevenueChart';
import './Dashboard.css';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${getBaseUrl()}/api/admin`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                });
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    if (loading) return <Loading />;

    return (
        <>
            <section className="dashboard-grid">
                <div className="dashboard-card">
                    <div className="icon-container icon-purple">
                        📚
                    </div>
                    <div>
                        <span className="text-large">{data?.totalBooks || 22}</span>
                        <span className="block text-gray">Products</span>
                    </div>
                </div>
                <div className="dashboard-card">
                    <div className="icon-container icon-green">
                        💰
                    </div>
                    <div>
                        <span className="text-large">${(data?.totalSales || 64.97).toFixed(2)}</span>
                        <span className="block text-gray">Total Sales</span>
                    </div>
                </div>
                <div className="dashboard-card">
                    <div className="icon-container icon-red">
                        🔥
                    </div>
                    <div>
                        <span className="text-large">{data?.trendingBooks || 15}</span>
                        <span className="text-xl text-gray">(13%)</span>
                        <span className="block text-gray">Trending Books This Month</span>
                    </div>
                </div>
                <div className="dashboard-card">
                    <div className="icon-container icon-blue">
                        <MdIncompleteCircle className="size-6" />
                    </div>
                    <div>
                        <span className="text-large">{data?.totalOrders || 2}</span>
                        <span className="block text-gray">Total Orders</span>
                    </div>
                </div>
            </section>

            <section className="dashboard-section">
                <div className="dashboard-card chart-card">
                    <div className="px-6 py-5 font-semibold border-b border-gray-100">
                        Monthly Revenue
                    </div>
                    <div className="p-4 flex-grow">
                        <div className="chart-placeholder">
                            <RevenueChart />
                        </div>
                    </div>
                </div>
                <div className="dashboard-card">
                    <div className="icon-container icon-yellow">
                        📦
                    </div>
                    <div>
                        <span className="text-large">02</span>
                        <span className="block text-gray">Orders Left</span>
                    </div>
                </div>
                <div className="dashboard-card">
                    <div className="icon-container icon-teal">
                        👀
                    </div>
                    <div>
                        <span className="text-large">139</span>
                        <span className="block text-gray">Website Visits (Last Day)</span>
                    </div>
                </div>
            </section>

            <section className="dashboard-section">
                <div className="dashboard-card">
                    <div className="px-6 py-5 font-semibold border-b border-gray-100">
                        Users by average order
                    </div>
                    <div className="user-list">
                        <ul>
                            {[
                                { name: 'Ralph Richards', score: '8.7', img: 'https://randomuser.me/api/portraits/men/80.jpg' },
                                { name: 'Bernard Murphy', score: '8.2', img: 'https://randomuser.me/api/portraits/men/81.jpg' },
                                { name: 'Arlene Robertson', score: '8.2', img: 'https://randomuser.me/api/portraits/women/82.jpg' },
                                { name: 'Jane Lane', score: '8.1', img: 'https://randomuser.me/api/portraits/women/83.jpg' },
                                { name: 'Pat Mckinney', score: '7.9', img: 'https://randomuser.me/api/portraits/men/84.jpg' },
                                { name: 'Norman Walters', score: '7.7', img: 'https://randomuser.me/api/portraits/men/85.jpg' },
                            ].map((user, index) => (
                                <li key={index} className="flex items-center">
                                    <div className="user-img">
                                        <img src={user.img} alt={`${user.name} profile`} />
                                    </div>
                                    <span className="text-gray">{user.name}</span>
                                    <span className="ml-auto font-semibold">{user.score}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="dashboard-card">
                    <div className="px-6 py-5 font-semibold border-b border-gray-100">
                        Students by type of studying
                    </div>
                    <div className="p-4 flex-grow">
                        {/* Placeholder for future content */}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Dashboard;