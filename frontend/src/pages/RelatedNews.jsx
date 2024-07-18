// src/News.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Typography, Divider, Card, CardContent, IconButton } from '@mui/material';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { formatDistanceToNow } from 'date-fns';

const News = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        const keyword = 'stock market';
        const apiKey = '4d59d55bc7944ba4b31c196fec95d1f7';  // Replace with your News API key
        const url = `https://newsapi.org/v2/everything?q=${keyword}&apiKey=${apiKey}`;

        try {
            const response = await axios.get(url);
            if (response.data.status === 'ok') {
                const articles = response.data.articles;
                const newsData = articles.map(article => ({
                    title: article.title,
                    author: article.author,
                    description: article.description,
                    url: article.url,
                    publishedAt: new Date(article.publishedAt)  // Convert publishedAt to Date object
                }));

                // Sort newsData by publishedAt in descending order (newest first)
                newsData.sort((a, b) => b.publishedAt - a.publishedAt);

                setNews(newsData);
            } else {
                console.error('Error fetching news:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching news:', error.message);
        }
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h6">
                    <NewspaperOutlinedIcon />
                    Related News
                </Typography>
                <Divider style={{ margin: '16px 0' }} />
            </CardContent>
            <CardContent style={{ maxHeight: '320px', overflowY: 'auto' }}>
                {news.map((newsItem, index) => (
                    <React.Fragment key={index}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={11}>
                                <Typography variant="h6" sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                                    {newsItem.title}
                                </Typography>
                                <Typography variant="body1" sx={{ fontSize: '0.9rem' }}>
                                    {newsItem.description}
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                    {formatDistanceToNow(newsItem.publishedAt, { addSuffix: true })}
                                </Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <IconButton
                                    color="primary"
                                    onClick={() => window.open(newsItem.url, '_blank')}
                                >
                                    <ArrowForwardIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                        {index !== news.length - 1 && <Divider style={{ margin: '16px 0' }} />}
                    </React.Fragment>
                ))}
            </CardContent>
        </Card>
    );
};

export default News;
