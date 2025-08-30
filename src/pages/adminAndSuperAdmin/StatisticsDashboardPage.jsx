// // // // import React, { useEffect } from 'react';
// // // // import { useSelector, useDispatch } from 'react-redux';
// // // // import {
// // // //   fetchGeneralStats,
// // // //   fetchSubscriptionStats,
// // // //   fetchPropertyStats,
// // // //   fetchPropertyTimeStats,
// // // //   fetchPropertyOperationTypeStats,
// // // // } from '../../redux/superAdmin/statisticsSlice'; // Adjust the import path as needed
// // // // import { Container, Grid, Typography, Paper, Box } from '@mui/material';
// // // // import Chart from 'react-apexcharts'; // A popular charting library that works well with React
// // // // import CircularProgress from '@mui/material/CircularProgress';

// // // // // Define a reusable component for displaying a stat card
// // // // const StatCard = ({ title, value }) => (
// // // //   <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
// // // //     <Typography variant="h6" color="primary">{title}</Typography>
// // // //     <Typography variant="h4" sx={{ mt: 1 }}>{value}</Typography>
// // // //   </Paper>
// // // // );

// // // // const StatisticsDashboard = () => {
// // // //   const dispatch = useDispatch();
// // // //   const { generalStats, subscriptionStats, propertyStats, loading, error } = useSelector((state) => state.statistics);

// // // //   useEffect(() => {
// // // //     // Fetch all necessary stats when the component mounts
// // // //     dispatch(fetchGeneralStats());
// // // //     dispatch(fetchSubscriptionStats());
// // // //     dispatch(fetchPropertyStats());
// // // //     dispatch(fetchPropertyTimeStats());
// // // //     dispatch(fetchPropertyOperationTypeStats());
// // // //   }, [dispatch]);

// // // //   // Handle loading and error states
// // // //   if (loading === 'pending') {
// // // //     return (
// // // //       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
// // // //         <CircularProgress />
// // // //       </Box>
// // // //     );
// // // //   }

// // // //   if (loading === 'failed' || error) {
// // // //     return (
// // // //       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
// // // //         <Typography variant="h5" color="error">
// // // //           Error: {error || 'Failed to fetch data.'}
// // // //         </Typography>
// // // //       </Box>
// // // //     );
// // // //   }

// // // //   // --- Chart Configuration (Example using react-apexcharts) ---
// // // //   const dailyChartOptions = {
// // // //     chart: { id: 'daily-stats' },
// // // //     xaxis: { categories: generalStats?.dailyStats.map(item => item.date) || [] },
// // // //   };
// // // //   const dailyChartSeries = [{
// // // //     name: 'Total Amount',
// // // //     data: generalStats?.dailyStats.map(item => item.totalAmount) || [],
// // // //   }];

// // // //   const monthlyChartOptions = {
// // // //     chart: { id: 'monthly-stats' },
// // // //     xaxis: { categories: generalStats?.monthlyStats.map(item => item.month) || [] },
// // // //   };
// // // //   const monthlyChartSeries = [{
// // // //     name: 'Total Transactions',
// // // //     data: generalStats?.monthlyStats.map(item => item.transactionCount) || [],
// // // //   }];

// // // //   return (
// // // //     <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
// // // //       <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>

// // // //       {/* General Statistics */}
// // // //       <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>General Statistics</Typography>
// // // //       <Grid container spacing={3}>
// // // //         <Grid item xs={12} md={6} lg={3}>
// // // //           <StatCard
// // // //             title="Total Revenue"
// // // //             value={`$${generalStats?.dailyStats.reduce((sum, item) => sum + item.totalAmount, 0).toFixed(2) || '0.00'}`}
// // // //           />
// // // //         </Grid>
// // // //         <Grid item xs={12} md={6} lg={3}>
// // // //           <StatCard
// // // //             title="Total Transactions"
// // // //             value={generalStats?.dailyStats.reduce((sum, item) => sum + item.transactionCount, 0) || 0}
// // // //           />
// // // //         </Grid>
// // // //       </Grid>

// // // //       {/* Charts for General Stats */}
// // // //       <Grid container spacing={3} sx={{ mt: 4 }}>
// // // //         <Grid item xs={12} md={6}>
// // // //           <Paper elevation={3} sx={{ p: 2 }}>
// // // //             <Typography variant="h6">Daily Revenue</Typography>
// // // //             <Chart options={dailyChartOptions} series={dailyChartSeries} type="bar" height={350} />
// // // //           </Paper>
// // // //         </Grid>
// // // //         <Grid item xs={12} md={6}>
// // // //           <Paper elevation={3} sx={{ p: 2 }}>
// // // //             <Typography variant="h6">Monthly Transaction Count</Typography>
// // // //             <Chart options={monthlyChartOptions} series={monthlyChartSeries} type="line" height={350} />
// // // //           </Paper>
// // // //         </Grid>
// // // //       </Grid>

// // // //       {/* Subscription Statistics */}
// // // //       <Typography variant="h5" sx={{ mt: 6, mb: 2 }}>Subscription Statistics</Typography>
// // // //       <Grid container spacing={3}>
// // // //         <Grid item xs={12} md={6} lg={3}>
// // // //           <StatCard
// // // //             title="Total Subscriptions"
// // // //             value={subscriptionStats?.dailyStats.reduce((sum, item) => sum + item.transactionCount, 0) || 0}
// // // //           />
// // // //         </Grid>
// // // //         <Grid item xs={12} md={6} lg={3}>
// // // //           <StatCard
// // // //             title="Subscription Revenue"
// // // //             value={`$${subscriptionStats?.dailyStats.reduce((sum, item) => sum + item.totalAmount, 0).toFixed(2) || '0.00'}`}
// // // //           />
// // // //         </Grid>
// // // //       </Grid>

// // // //       {/* Property Statistics */}
// // // //       <Typography variant="h5" sx={{ mt: 6, mb: 2 }}>Property Statistics</Typography>
// // // //       <Grid container spacing={3}>
// // // //         <Grid item xs={12} md={6} lg={3}>
// // // //           <StatCard
// // // //             title="Total Properties"
// // // //             value={propertyStats?.dailyStats.reduce((sum, item) => sum + item.transactionCount, 0) || 0}
// // // //           />
// // // //         </Grid>
// // // //         <Grid item xs={12} md={6} lg={3}>
// // // //           <StatCard
// // // //             title="Property Revenue"
// // // //             value={`$${propertyStats?.dailyStats.reduce((sum, item) => sum + item.totalAmount, 0).toFixed(2) || '0.00'}`}
// // // //           />
// // // //         </Grid>
// // // //       </Grid>
// // // //     </Container>
// // // //   );
// // // // };

// // // // export default StatisticsDashboard;

// // // // import React, { useEffect } from 'react';
// // // // import { useSelector, useDispatch } from 'react-redux';
// // // // import {
// // // //   fetchGeneralStats,
// // // //   fetchSubscriptionStats,
// // // //   fetchPropertyStats,
// // // //   fetchPropertyTimeStats,
// // // //   fetchPropertyOperationTypeStats,
// // // // } from '../../redux/superAdmin/statisticsSlice'; // Adjust the import path as needed
// // // // import { Container, Grid, Typography, Paper, Box } from '@mui/material';
// // // // import Chart from 'react-apexcharts';
// // // // import CircularProgress from '@mui/material/CircularProgress';
// // // // import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
// // // // import { deepPurple, green, blueGrey, amber } from '@mui/material/colors';

// // // // // Create a custom MUI theme for a beautiful restyle
// // // // let theme = createTheme({
// // // //   palette: {
// // // //     primary: {
// // // //       main: deepPurple[600],
// // // //     },
// // // //     secondary: {
// // // //       main: green['A400'],
// // // //     },
// // // //     background: {
// // // //       default: blueGrey[50],
// // // //       paper: '#fff',
// // // //     },
// // // //   },
// // // //   typography: {
// // // //     fontFamily: 'Roboto, sans-serif',
// // // //     h4: {
// // // //       fontWeight: 600,
// // // //       color: blueGrey[800],
// // // //     },
// // // //     h5: {
// // // //       fontWeight: 500,
// // // //       color: blueGrey[700],
// // // //     },
// // // //     h6: {
// // // //       fontWeight: 500,
// // // //       color: deepPurple[600],
// // // //     },
// // // //     body1: {
// // // //       color: blueGrey[600],
// // // //     },
// // // //   },
// // // //   components: {
// // // //     MuiPaper: {
// // // //       styleOverrides: {
// // // //         root: {
// // // //           borderRadius: 16,
// // // //           boxShadow: '0 4px 20px 0 rgba(0,0,0,0.08)',
// // // //           transition: 'transform 0.2s',
// // // //           '&:hover': {
// // // //             transform: 'translateY(-4px)',
// // // //           },
// // // //         },
// // // //       },
// // // //     },
// // // //   },
// // // // });

// // // // theme = responsiveFontSizes(theme);

// // // // // Define a reusable component for displaying a stat card
// // // // const StatCard = ({ title, value }) => (
// // // //   <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
// // // //     <Typography variant="h6">{title}</Typography>
// // // //     <Typography variant="h4" sx={{ mt: 1, color: deepPurple[500] }}>
// // // //       {value}
// // // //     </Typography>
// // // //   </Paper>
// // // // );

// // // // const StatisticsDashboard = () => {
// // // //   const dispatch = useDispatch();
// // // //   const { generalStats, subscriptionStats, propertyStats, propertyTimeStats, propertyOperationTypeStats, loading, error } = useSelector((state) => state.statistics);

// // // //   useEffect(() => {
// // // //     dispatch(fetchGeneralStats());
// // // //     dispatch(fetchSubscriptionStats());
// // // //     dispatch(fetchPropertyStats());
// // // //     dispatch(fetchPropertyTimeStats());
// // // //     dispatch(fetchPropertyOperationTypeStats());
// // // //   }, [dispatch]);

// // // //   // Handle loading and error states
// // // //   if (loading === 'pending') {
// // // //     return (
// // // //       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
// // // //         <CircularProgress color="primary" />
// // // //       </Box>
// // // //     );
// // // //   }

// // // //   if (loading === 'failed' || error) {
// // // //     return (
// // // //       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
// // // //         <Typography variant="h5" color="error">
// // // //           Error: {error || 'Failed to fetch data.'}
// // // //         </Typography>
// // // //       </Box>
// // // //     );
// // // //   }

// // // //   // --- Chart Configuration ---

// // // //   // General Statistics Charts
// // // //   const dailyRevenueOptions = {
// // // //     chart: { id: 'daily-revenue-chart' },
// // // //     xaxis: { categories: generalStats?.dailyStats.map(item => item.date) || [] },
// // // //     colors: [deepPurple[400]],
// // // //     tooltip: { theme: 'dark' },
// // // //   };
// // // //   const dailyRevenueSeries = [{
// // // //     name: 'Daily Revenue',
// // // //     data: generalStats?.dailyStats.map(item => item.totalAmount) || [],
// // // //   }];

// // // //   const monthlyTransactionOptions = {
// // // //     chart: { id: 'monthly-transaction-chart' },
// // // //     xaxis: { categories: generalStats?.monthlyStats.map(item => item.month) || [] },
// // // //     colors: [green['A400']],
// // // //     tooltip: { theme: 'dark' },
// // // //   };
// // // //   const monthlyTransactionSeries = [{
// // // //     name: 'Monthly Transactions',
// // // //     data: generalStats?.monthlyStats.map(item => item.transactionCount) || [],
// // // //   }];

// // // //   // Subscription Statistics Charts
// // // //   const subscriptionChartOptions = {
// // // //     chart: { id: 'subscription-stats' },
// // // //     labels: subscriptionStats?.subscriptionCountByPlan.map(item => item.plan) || [],
// // // //     colors: [amber[500], deepPurple[400], green[400]],
// // // //     legend: { position: 'bottom' },
// // // //     tooltip: { theme: 'dark' },
// // // //     responsive: [{
// // // //       breakpoint: 480,
// // // //       options: {
// // // //         chart: {
// // // //           width: 200
// // // //         },
// // // //         legend: {
// // // //           position: 'bottom'
// // // //         }
// // // //       }
// // // //     }]
// // // //   };
// // // //   const subscriptionChartSeries = subscriptionStats?.subscriptionCountByPlan.map(item => item.count) || [];

// // // //   // Property Statistics Charts
// // // //   const propertyOperationTypeOptions = {
// // // //     chart: { id: 'property-op-type-chart' },
// // // //     xaxis: { categories: propertyOperationTypeStats?.map(item => item.operationType) || [] },
// // // //     colors: [deepPurple[400], green['A400']],
// // // //     tooltip: { theme: 'dark' },
// // // //   };
// // // //   const propertyOperationTypeSeries = [{
// // // //     name: 'Property Count',
// // // //     data: propertyOperationTypeStats?.map(item => item.count) || [],
// // // //   }];

// // // //   const propertyTimeOptions = {
// // // //     chart: { id: 'property-time-chart' },
// // // //     xaxis: { categories: propertyTimeStats?.map(item => item.date) || [] },
// // // //     colors: [amber[500]],
// // // //     tooltip: { theme: 'dark' },
// // // //   };
// // // //   const propertyTimeSeries = [{
// // // //     name: 'New Properties',
// // // //     data: propertyTimeStats?.map(item => item.count) || [],
// // // //   }];

// // // //   return (
// // // //     <ThemeProvider theme={theme}>
// // // //       <Box sx={{ flexGrow: 1, p: 3, backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
// // // //         <Container maxWidth="xl">
// // // //           <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
// // // //             Admin Dashboard 🚀
// // // //           </Typography>

// // // //           {/* General Statistics */}
// // // //           <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
// // // //             📊 General Statistics
// // // //           </Typography>
// // // //           <Grid container spacing={3}>
// // // //             <Grid item xs={12} sm={6} md={6} lg={4}>
// // // //               <StatCard
// // // //                 title="Total Transactions"
// // // //                 value={generalStats?.dailyStats.reduce((sum, item) => sum + item.transactionCount, 0) || 0}
// // // //               />
// // // //             </Grid>
// // // //             <Grid item xs={12} sm={6} md={6} lg={4}>
// // // //               <StatCard
// // // //                 title="Total Revenue"
// // // //                 value={`$${(generalStats?.dailyStats.reduce((sum, item) => sum + item.totalAmount, 0) || 0).toFixed(2)}`}
// // // //               />
// // // //             </Grid>
// // // //             <Grid item xs={12} sm={6} md={6} lg={4}>
// // // //               <StatCard
// // // //                 title="Total Subscriptions"
// // // //                 value={subscriptionStats?.totalSubscriptions || 0}
// // // //               />
// // // //             </Grid>
// // // //           </Grid>

// // // //           <Grid container spacing={4} sx={{ mt: 4 }}>
// // // //             <Grid item xs={12} md={6}>
// // // //               <Paper elevation={3} sx={{ p: 3 }}>
// // // //                 <Typography variant="h6" gutterBottom>Daily Revenue</Typography>
// // // //                 <Chart options={dailyRevenueOptions} series={dailyRevenueSeries} type="bar" height={350} />
// // // //               </Paper>
// // // //             </Grid>
// // // //             <Grid item xs={12} md={6}>
// // // //               <Paper elevation={3} sx={{ p: 3 }}>
// // // //                 <Typography variant="h6" gutterBottom>Monthly Transaction Count</Typography>
// // // //                 <Chart options={monthlyTransactionOptions} series={monthlyTransactionSeries} type="line" height={350} />
// // // //               </Paper>
// // // //             </Grid>
// // // //           </Grid>

// // // //           ---

// // // //           {/* Subscription Statistics */}
// // // //           <Typography variant="h5" sx={{ mt: 6, mb: 2 }}>
// // // //             ⭐ Subscription Statistics
// // // //           </Typography>
// // // //           <Grid container spacing={4}>
// // // //             <Grid item xs={12} md={6}>
// // // //               <Paper elevation={3} sx={{ p: 3 }}>
// // // //                 <Typography variant="h6" gutterBottom>Subscriptions by Plan</Typography>
// // // //                 {subscriptionChartSeries.length > 0 ? (
// // // //                   <Chart options={subscriptionChartOptions} series={subscriptionChartSeries} type="donut" height={350} />
// // // //                 ) : (
// // // //                   <Typography variant="body1" align="center" sx={{ py: 4 }}>No subscription data available.</Typography>
// // // //                 )}
// // // //               </Paper>
// // // //             </Grid>
// // // //             <Grid item xs={12} md={6}>
// // // //               <Paper elevation={3} sx={{ p: 3 }}>
// // // //                 <Typography variant="h6" gutterBottom>Subscription Revenue Over Time</Typography>
// // // //                 <Chart
// // // //                   options={{
// // // //                     chart: { id: 'subscription-revenue' },
// // // //                     xaxis: { categories: subscriptionStats?.dailyStats.map(item => item.date) || [] },
// // // //                     colors: [amber[500]],
// // // //                     tooltip: { theme: 'dark' },
// // // //                   }}
// // // //                   series={[{
// // // //                     name: 'Revenue',
// // // //                     data: subscriptionStats?.dailyStats.map(item => item.totalAmount) || [],
// // // //                   }]}
// // // //                   type="area"
// // // //                   height={350}
// // // //                 />
// // // //               </Paper>
// // // //             </Grid>
// // // //           </Grid>

// // // //           ---

// // // //           {/* Property Statistics */}
// // // //           <Typography variant="h5" sx={{ mt: 6, mb: 2 }}>
// // // //             🏡 Property Statistics
// // // //           </Typography>
// // // //           <Grid container spacing={4}>
// // // //             <Grid item xs={12} md={6}>
// // // //               <Paper elevation={3} sx={{ p: 3 }}>
// // // //                 <Typography variant="h6" gutterBottom>Properties by Operation Type</Typography>
// // // //                 <Chart options={propertyOperationTypeOptions} series={propertyOperationTypeSeries} type="bar" height={350} />
// // // //               </Paper>
// // // //             </Grid>
// // // //             <Grid item xs={12} md={6}>
// // // //               <Paper elevation={3} sx={{ p: 3 }}>
// // // //                 <Typography variant="h6" gutterBottom>New Properties Over Time</Typography>
// // // //                 <Chart options={propertyTimeOptions} series={propertyTimeSeries} type="line" height={350} />
// // // //               </Paper>
// // // //             </Grid>
// // // //           </Grid>
// // // //         </Container>
// // // //       </Box>
// // // //     </ThemeProvider>
// // // //   );
// // // // };

// // // // export default StatisticsDashboard;

// // // // src/components/StatisticsDashboard.jsx
// // // import React, { useState, useEffect } from 'react';
// // // import { useSelector, useDispatch } from 'react-redux';
// // // import {
// // //   fetchGeneralStats,
// // //   fetchSubscriptionStats,
// // //   fetchPropertyStats,
// // //   fetchPropertyTimeStats,
// // //   fetchPropertyOperationTypeStats,
// // // } from '../../redux/superAdmin/statisticsSlice';
// // // import { Container, Grid, Typography, Paper, Box, Button, ToggleButtonGroup, ToggleButton } from '@mui/material';
// // // import Chart from 'react-apexcharts';
// // // import CircularProgress from '@mui/material/CircularProgress';
// // // import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
// // // import { deepPurple, green, blueGrey, amber } from '@mui/material/colors';

// // // // Create a custom MUI theme for a beautiful restyle
// // // let theme = createTheme({
// // //   palette: {
// // //     primary: {
// // //       main: deepPurple[600],
// // //     },
// // //     secondary: {
// // //       main: green['A400'],
// // //     },
// // //     background: {
// // //       default: blueGrey[50],
// // //       paper: '#fff',
// // //     },
// // //   },
// // //   typography: {
// // //     fontFamily: 'Roboto, sans-serif',
// // //     h4: {
// // //       fontWeight: 600,
// // //       color: blueGrey[800],
// // //     },
// // //     h5: {
// // //       fontWeight: 500,
// // //       color: blueGrey[700],
// // //     },
// // //     h6: {
// // //       fontWeight: 500,
// // //       color: deepPurple[600],
// // //     },
// // //     body1: {
// // //       color: blueGrey[600],
// // //     },
// // //   },
// // //   components: {
// // //     MuiPaper: {
// // //       styleOverrides: {
// // //         root: {
// // //           borderRadius: 16,
// // //           boxShadow: '0 4px 20px 0 rgba(0,0,0,0.08)',
// // //           transition: 'transform 0.2s',
// // //           '&:hover': {
// // //             transform: 'translateY(-4px)',
// // //           },
// // //         },
// // //       },
// // //     },
// // //   },
// // // });

// // // theme = responsiveFontSizes(theme);

// // // // Reusable Stat Card component
// // // const StatCard = ({ title, value }) => (
// // //   <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
// // //     <Typography variant="h6">{title}</Typography>
// // //     <Typography variant="h4" sx={{ mt: 1, color: deepPurple[500] }}>
// // //       {value}
// // //     </Typography>
// // //   </Paper>
// // // );

// // // // New, reusable Dynamic Chart component
// // // const DynamicChart = ({ title, data, timePeriod, type, seriesName, color }) => {
// // //   const chartData = data[timePeriod] || [];
// // //   const categories = chartData.map(item => {
// // //     switch (timePeriod) {
// // //       case 'dailyStats': return item.date;
// // //       case 'weeklyStats': return `Week ${item.week}, ${item.year}`;
// // //       case 'monthlyStats': return item.month;
// // //       case 'yearlyStats': return item.year;
// // //       default: return '';
// // //     }
// // //   });

// // //   const series = [{
// // //     name: seriesName,
// // //     data: chartData.map(item => item.totalAmount || item.transactionCount || item.count),
// // //   }];

// // //   const options = {
// // //     chart: { id: `${title}-${timePeriod}` },
// // //     xaxis: { categories: categories },
// // //     colors: [color],
// // //     tooltip: { theme: 'dark' },
// // //     stroke: { curve: 'smooth' },
// // //     dataLabels: { enabled: false },
// // //     yaxis: {
// // //       labels: {
// // //         formatter: (value) => value.toFixed(0)
// // //       }
// // //     }
// // //   };

// // //   if (!chartData || chartData.length === 0) {
// // //     return (
// // //       <Box sx={{ p: 3, textAlign: 'center' }}>
// // //         <Typography variant="body1">No data available for this period.</Typography>
// // //       </Box>
// // //     );
// // //   }

// // //   return (
// // //     <Paper elevation={3} sx={{ p: 3 }}>
// // //       <Typography variant="h6" gutterBottom>{title}</Typography>
// // //       <Chart options={options} series={series} type={type} height={350} />
// // //     </Paper>
// // //   );
// // // };

// // // // Main Dashboard Component
// // // const StatisticsDashboard = () => {
// // //   const dispatch = useDispatch();
// // //   const { generalStats, subscriptionStats, propertyStats, propertyTimeStats, propertyOperationTypeStats, loading, error } = useSelector((state) => state.statistics);

// // //   // State for the selected time period
// // //   const [timePeriod, setTimePeriod] = useState('monthlyStats');

// // //   useEffect(() => {
// // //     dispatch(fetchGeneralStats());
// // //     dispatch(fetchSubscriptionStats());
// // //     dispatch(fetchPropertyStats());
// // //     dispatch(fetchPropertyTimeStats());
// // //     dispatch(fetchPropertyOperationTypeStats());
// // //   }, [dispatch]);

// // //   const handleTimePeriodChange = (event, newTimePeriod) => {
// // //     if (newTimePeriod !== null) {
// // //       setTimePeriod(newTimePeriod);
// // //     }
// // //   };

// // //   // Handle loading and error states
// // //   if (loading === 'pending') {
// // //     return (
// // //       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
// // //         <CircularProgress color="primary" />
// // //       </Box>
// // //     );
// // //   }

// // //   if (loading === 'failed' || error) {
// // //     return (
// // //       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
// // //         <Typography variant="h5" color="error">
// // //           Error: {error || 'Failed to fetch data.'}
// // //         </Typography>
// // //       </Box>
// // //     );
// // //   }

// // //   return (
// // //     <ThemeProvider theme={theme}>
// // //       <Box sx={{ flexGrow: 1, p: 3, backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
// // //         <Container maxWidth="xl">
// // //           <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
// // //             Admin Dashboard 🚀
// // //           </Typography>

// // //           {/* General Statistics */}
// // //           <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
// // //             📊 General Statistics
// // //           </Typography>
// // //           <Grid container spacing={3}>
// // //             <Grid item xs={12} sm={6} md={6} lg={4}>
// // //               <StatCard
// // //                 title="Total Transactions"
// // //                 value={generalStats?.dailyStats.reduce((sum, item) => sum + item.transactionCount, 0) || 0}
// // //               />
// // //             </Grid>
// // //             <Grid item xs={12} sm={6} md={6} lg={4}>
// // //               <StatCard
// // //                 title="Total Revenue"
// // //                 value={`$${(generalStats?.dailyStats.reduce((sum, item) => sum + item.totalAmount, 0) || 0).toFixed(2)}`}
// // //               />
// // //             </Grid>
// // //             <Grid item xs={12} sm={6} md={6} lg={4}>
// // //               <StatCard
// // //                 title="Total Subscriptions"
// // //                 value={subscriptionStats?.totalSubscriptions || 0}
// // //               />
// // //             </Grid>
// // //           </Grid>

// // //           <Grid container spacing={4} sx={{ mt: 4 }}>
// // //             <Grid item xs={12} md={6}>
// // //               <Box mb={2} display="flex" justifyContent="center">
// // //                 <ToggleButtonGroup
// // //                   value={timePeriod}
// // //                   exclusive
// // //                   onChange={handleTimePeriodChange}
// // //                   aria-label="time period"
// // //                 >
// // //                   <ToggleButton value="dailyStats">Daily</ToggleButton>
// // //                   <ToggleButton value="weeklyStats">Weekly</ToggleButton>
// // //                   <ToggleButton value="monthlyStats">Monthly</ToggleButton>
// // //                   <ToggleButton value="yearlyStats">Yearly</ToggleButton>
// // //                 </ToggleButtonGroup>
// // //               </Box>
// // //               <DynamicChart
// // //                 title="General Revenue"
// // //                 data={generalStats}
// // //                 timePeriod={timePeriod}
// // //                 type="line"
// // //                 seriesName="Revenue"
// // //                 color={deepPurple[400]}
// // //               />
// // //             </Grid>
// // //             <Grid item xs={12} md={6}>
// // //               <Box mb={2} display="flex" justifyContent="center">
// // //                 <ToggleButtonGroup
// // //                   value={timePeriod}
// // //                   exclusive
// // //                   onChange={handleTimePeriodChange}
// // //                   aria-label="time period"
// // //                 >
// // //                   <ToggleButton value="dailyStats">Daily</ToggleButton>
// // //                   <ToggleButton value="weeklyStats">Weekly</ToggleButton>
// // //                   <ToggleButton value="monthlyStats">Monthly</ToggleButton>
// // //                   <ToggleButton value="yearlyStats">Yearly</ToggleButton>
// // //                 </ToggleButtonGroup>
// // //               </Box>
// // //               <DynamicChart
// // //                 title="General Transactions"
// // //                 data={generalStats}
// // //                 timePeriod={timePeriod}
// // //                 type="bar"
// // //                 seriesName="Transactions"
// // //                 color={green['A400']}
// // //               />
// // //             </Grid>
// // //           </Grid>

// // //           ---

// // //           {/* Subscription Statistics */}
// // //           <Typography variant="h5" sx={{ mt: 6, mb: 2 }}>
// // //             ⭐ Subscription Statistics
// // //           </Typography>
// // //           <Grid container spacing={4}>
// // //             <Grid item xs={12} md={6}>
// // //               <Paper elevation={3} sx={{ p: 3 }}>
// // //                 <Typography variant="h6" gutterBottom>Subscriptions by Plan</Typography>
// // //                 {subscriptionStats?.subscriptionCountByPlan.length > 0 ? (
// // //                   <Chart options={{
// // //                     chart: { id: 'subscription-stats' },
// // //                     labels: subscriptionStats?.subscriptionCountByPlan.map(item => item.plan) || [],
// // //                     colors: [amber[500], deepPurple[400], green[400]],
// // //                     legend: { position: 'bottom' },
// // //                     tooltip: { theme: 'dark' },
// // //                   }}
// // //                   series={subscriptionStats?.subscriptionCountByPlan.map(item => item.count) || []}
// // //                   type="donut"
// // //                   height={350} />
// // //                 ) : (
// // //                   <Typography variant="body1" align="center" sx={{ py: 4 }}>No subscription data available.</Typography>
// // //                 )}
// // //               </Paper>
// // //             </Grid>
// // //             <Grid item xs={12} md={6}>
// // //               <Box mb={2} display="flex" justifyContent="center">
// // //                 <ToggleButtonGroup
// // //                   value={timePeriod}
// // //                   exclusive
// // //                   onChange={handleTimePeriodChange}
// // //                   aria-label="time period"
// // //                 >
// // //                   <ToggleButton value="dailyStats">Daily</ToggleButton>
// // //                   <ToggleButton value="weeklyStats">Weekly</ToggleButton>
// // //                   <ToggleButton value="monthlyStats">Monthly</ToggleButton>
// // //                   <ToggleButton value="yearlyStats">Yearly</ToggleButton>
// // //                 </ToggleButtonGroup>
// // //               </Box>
// // //               <DynamicChart
// // //                 title="Subscription Revenue Over Time"
// // //                 data={subscriptionStats}
// // //                 timePeriod={timePeriod}
// // //                 type="area"
// // //                 seriesName="Revenue"
// // //                 color={amber[500]}
// // //               />
// // //             </Grid>
// // //           </Grid>

// // //           ---

// // //           {/* Property Statistics */}
// // //           <Typography variant="h5" sx={{ mt: 6, mb: 2 }}>
// // //             🏡 Property Statistics
// // //           </Typography>
// // //           <Grid container spacing={4}>
// // //             <Grid item xs={12} md={6}>
// // //               <Paper elevation={3} sx={{ p: 3 }}>
// // //                 <Typography variant="h6" gutterBottom>Properties by Operation Type</Typography>
// // //                 <Chart options={{
// // //                   chart: { id: 'property-op-type-chart' },
// // //                   xaxis: { categories: propertyOperationTypeStats?.map(item => item.operationType) || [] },
// // //                   colors: [deepPurple[400], green['A400']],
// // //                   tooltip: { theme: 'dark' },
// // //                 }}
// // //                 series={[{
// // //                   name: 'Property Count',
// // //                   data: propertyOperationTypeStats?.map(item => item.count) || [],
// // //                 }]}
// // //                 type="bar"
// // //                 height={350} />
// // //               </Paper>
// // //             </Grid>
// // //             <Grid item xs={12} md={6}>
// // //               <Box mb={2} display="flex" justifyContent="center">
// // //                 <ToggleButtonGroup
// // //                   value={timePeriod}
// // //                   exclusive
// // //                   onChange={handleTimePeriodChange}
// // //                   aria-label="time period"
// // //                 >
// // //                   <ToggleButton value="dailyStats">Daily</ToggleButton>
// // //                   <ToggleButton value="weeklyStats">Weekly</ToggleButton>
// // //                   <ToggleButton value="monthlyStats">Monthly</ToggleButton>
// // //                   <ToggleButton value="yearlyStats">Yearly</ToggleButton>
// // //                 </ToggleButtonGroup>
// // //               </Box>
// // //               <DynamicChart
// // //                 title="New Properties Over Time"
// // //                 data={propertyStats}
// // //                 timePeriod={timePeriod}
// // //                 type="line"
// // //                 seriesName="New Properties"
// // //                 color={amber[500]}
// // //               />
// // //             </Grid>
// // //           </Grid>
// // //         </Container>
// // //       </Box>
// // //     </ThemeProvider>
// // //   );
// // // };

// // // export default StatisticsDashboard;

// // import React, { useState, useEffect } from 'react';
// // import { useSelector, useDispatch } from 'react-redux';
// // import {
// //   fetchGeneralStats,
// //   fetchSubscriptionStats,
// //   fetchPropertyStats,
// //   fetchPropertyTimeStats,
// //   fetchPropertyOperationTypeStats,
// // } from '../../redux/superAdmin/statisticsSlice';
// // import { Container, Grid, Typography, Paper, Box, ToggleButtonGroup, ToggleButton } from '@mui/material';
// // import Chart from 'react-apexcharts';
// // import CircularProgress from '@mui/material/CircularProgress';
// // import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
// // import { deepPurple, green, blueGrey, amber } from '@mui/material/colors';

// // // Create a custom MUI theme
// // let theme = createTheme({
// //   palette: {
// //     primary: { main: deepPurple[600] },
// //     secondary: { main: green['A400'] },
// //     background: { default: blueGrey[50], paper: '#fff' },
// //   },
// //   typography: {
// //     fontFamily: 'Roboto, sans-serif',
// //     h4: { fontWeight: 600, color: blueGrey[800] },
// //     h5: { fontWeight: 500, color: blueGrey[700] },
// //     h6: { fontWeight: 500, color: deepPurple[600] },
// //     body1: { color: blueGrey[600] },
// //   },
// //   components: {
// //     MuiPaper: {
// //       styleOverrides: {
// //         root: {
// //           borderRadius: 16,
// //           boxShadow: '0 4px 20px 0 rgba(0,0,0,0.08)',
// //           transition: 'transform 0.2s',
// //           '&:hover': { transform: 'translateY(-4px)' },
// //         },
// //       },
// //     },
// //   },
// // });

// // theme = responsiveFontSizes(theme);

// // // Reusable Stat Card component
// // const StatCard = ({ title, value }) => (
// //   <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
// //     <Typography variant="h6">{title}</Typography>
// //     <Typography variant="h4" sx={{ mt: 1, color: deepPurple[500] }}>{value}</Typography>
// //   </Paper>
// // );

// // // Consolidated chart component for all time-based data
// // const CombinedTimeChart = ({ title, data, timePeriod, type, seriesName, color, valueKey }) => {
// //   const chartData = data?.[timePeriod] || [];
// //   const categories = chartData.map(item => {
// //     switch (timePeriod) {
// //       case 'dailyStats': return item.date;
// //       case 'weeklyStats': return `Week ${item.week}, ${item.year}`;
// //       case 'monthlyStats': return item.month;
// //       case 'yearlyStats': return item.year;
// //       default: return '';
// //     }
// //   });

// //   const series = [{
// //     name: seriesName,
// //     data: chartData.map(item => item[valueKey]),
// //   }];

// //   const options = {
// //     chart: { id: `${title}-${timePeriod}` },
// //     xaxis: { categories: categories },
// //     colors: [color],
// //     tooltip: { theme: 'dark' },
// //     stroke: { curve: 'smooth' },
// //     dataLabels: { enabled: false },
// //     yaxis: { labels: { formatter: (value) => value?.toFixed(0) } }
// //   };

// //   if (!chartData || chartData.length === 0) {
// //     return (
// //       <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
// //         <Typography variant="h6" gutterBottom>{title}</Typography>
// //         <Typography variant="body1" sx={{ py: 4 }}>No data available for this period.</Typography>
// //       </Paper>
// //     );
// //   }

// //   return (
// //     <Paper elevation={3} sx={{ p: 3 }}>
// //       <Typography variant="h6" gutterBottom>{title}</Typography>
// //       <Chart options={options} series={series} type={type} height={350} />
// //     </Paper>
// //   );
// // };

// // // Main Dashboard Component
// // const StatisticsDashboard = () => {
// //   const dispatch = useDispatch();
// //   const {
// //     generalStats,
// //     subscriptionStats,
// //     propertyStats,
// //     loading,
// //     error
// //   } = useSelector((state) => state.statistics);

// //   // State for the single time period selection
// //   const [timePeriod, setTimePeriod] = useState('monthlyStats');

// //   useEffect(() => {
// //     // These actions are fine, but their results should update the
// //     // `propertyStats` key in the Redux store.
// //     dispatch(fetchGeneralStats());
// //     dispatch(fetchSubscriptionStats());
// //     dispatch(fetchPropertyStats());
// //     // The following actions should likely be refactored on the backend
// //     // to update the single `propertyStats` object with all data.
// //     dispatch(fetchPropertyTimeStats());
// //     dispatch(fetchPropertyOperationTypeStats());
// //   }, [dispatch]);

// //   const handleTimePeriodChange = (event, newTimePeriod) => {
// //     if (newTimePeriod !== null) {
// //       setTimePeriod(newTimePeriod);
// //     }
// //   };

// //   // Handle loading and error states
// //   if (loading === 'pending') {
// //     return (
// //       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
// //         <CircularProgress color="primary" />
// //       </Box>
// //     );
// //   }

// //   if (loading === 'failed' || error) {
// //     return (
// //       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
// //         <Typography variant="h5" color="error">
// //           Error: {error || 'Failed to fetch data.'}
// //         </Typography>
// //       </Box>
// //     );
// //   }

// //   return (
// //     <ThemeProvider theme={theme}>
// //       <Box sx={{ flexGrow: 1, p: 3, backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
// //         <Container maxWidth="xl">
// //           <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
// //             Admin Dashboard 🚀
// //           </Typography>

// //           {/* General Statistics */}
// //           <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
// //             📊 General Statistics
// //           </Typography>
// //           <Grid container spacing={3}>
// //             <Grid item xs={12} sm={6} md={6} lg={4}>
// //               <StatCard
// //                 title="Total Transactions"
// //                 value={generalStats?.dailyStats.reduce((sum, item) => sum + item.transactionCount, 0) || 0}
// //               />
// //             </Grid>
// //             <Grid item xs={12} sm={6} md={6} lg={4}>
// //               <StatCard
// //                 title="Total Revenue"
// //                 value={`$${(generalStats?.dailyStats.reduce((sum, item) => sum + item.totalAmount, 0) || 0).toFixed(2)}`}
// //               />
// //             </Grid>
// //             <Grid item xs={12} sm={6} md={6} lg={4}>
// //               <StatCard
// //                 title="Total Subscriptions"
// //                 value={subscriptionStats?.totalSubscriptions || 0}
// //               />
// //             </Grid>
// //           </Grid>

// //           <Box mb={2} display="flex" justifyContent="center" sx={{ mt: 4 }}>
// //             <ToggleButtonGroup
// //               value={timePeriod}
// //               exclusive
// //               onChange={handleTimePeriodChange}
// //               aria-label="time period"
// //               color="primary"
// //             >
// //               <ToggleButton value="yearlyStats">Yearly</ToggleButton>
// //               <ToggleButton value="monthlyStats">Monthly</ToggleButton>
// //               <ToggleButton value="weeklyStats">Weekly</ToggleButton>
// //               <ToggleButton value="dailyStats">Daily</ToggleButton>
// //             </ToggleButtonGroup>
// //           </Box>

// //           <Grid container spacing={4} >
// //             <Grid item xs={12} md={6} width={'45%'}>
// //               <CombinedTimeChart
// //                 title="General Revenue"
// //                 data={generalStats}
// //                 timePeriod={timePeriod}
// //                 type="line"
// //                 seriesName="Revenue"
// //                 color={deepPurple[400]}
// //                 valueKey="totalAmount"
// //               />
// //             </Grid>
// //             <Grid item xs={12} md={6}  width={'45%'}>
// //               <CombinedTimeChart
// //                 title="General Transaction Count"
// //                 data={generalStats}
// //                 timePeriod={timePeriod}
// //                 type="bar"
// //                 seriesName="Transaction Count"
// //                 color={green['A400']}
// //                 valueKey="transactionCount"
// //               />
// //             </Grid>
// //           </Grid>

// //           ---

// //           {/* Subscription Statistics */}
// //           <Typography variant="h5" sx={{ mt: 6, mb: 2 }}>
// //             ⭐ Subscription Statistics
// //           </Typography>
// //           <Grid container spacing={4}>
// //             <Grid item xs={12} md={6}>
// //               <Paper elevation={3} sx={{ p: 3 }}>
// //                 <Typography variant="h6" gutterBottom>Subscriptions by Plan</Typography>
// //                 {subscriptionStats?.length > 0 ? (
// //                   <Chart options={{
// //                     chart: { id: 'subscription-stats' },
// //                     labels: subscriptionStats?.map(item => item.plan) || [],
// //                     colors: [amber[500], deepPurple[400], green[400]],
// //                     legend: { position: 'bottom' },
// //                     tooltip: { theme: 'dark' },
// //                   }}
// //                   series={subscriptionStats?.map(item => item.count) || []}
// //                   type="donut"
// //                   height={350} />
// //                 ) : (
// //                   <Typography variant="body1" align="center" sx={{ py: 4 }}>No subscription data available.</Typography>
// //                 )}
// //               </Paper>
// //             </Grid>
// //             <Grid item xs={12} md={6}>
// //               <CombinedTimeChart
// //                 title="Subscription Revenue Over Time"
// //                 data={subscriptionStats}
// //                 timePeriod={timePeriod}
// //                 type="area"
// //                 seriesName="Revenue"
// //                 color={amber[500]}
// //                 valueKey="totalAmount"
// //               />
// //             </Grid>
// //           </Grid>

// //           ---

// //           {/* Property Statistics */}
// //           <Typography variant="h5" sx={{ mt: 6, mb: 2 }}>
// //             🏡 Property Statistics
// //           </Typography>
// //           <Grid container spacing={4}>
// //             <Grid item xs={12} md={6}>
// //               <Paper elevation={3} sx={{ p: 3 }}>
// //                 <Typography variant="h6" gutterBottom>Properties by Operation Type</Typography>
// //                 {propertyStats?.operationTypeStats?.length > 0 ? (
// //                     <Chart options={{
// //                     chart: { id: 'property-op-type-chart' },
// //                     xaxis: { categories: propertyStats?.operationTypeStats?.map(item => item.operationType) || [] },
// //                     colors: [deepPurple[400], green['A400']],
// //                     tooltip: { theme: 'dark' },
// //                     }}
// //                     series={[{
// //                     name: 'Property Count',
// //                     data: propertyStats?.operationTypeStats?.map(item => item.transactionCount) || [],
// //                     }]}
// //                     type="bar"
// //                     height={350} />
// //                 ) : (
// //                     <Typography variant="body1" align="center" sx={{ py: 4 }}>No property operation data available.</Typography>
// //                 )}
// //               </Paper>
// //             </Grid>
// //             <Grid item xs={12} md={6}>
// //               <CombinedTimeChart
// //                 title="New Properties Over Time"
// //                 data={propertyStats}
// //                 timePeriod={timePeriod}
// //                 type="line"
// //                 seriesName="New Properties"
// //                 color={amber[500]}
// //                 valueKey="transactionCount"
// //               />
// //             </Grid>
// //           </Grid>
// //         </Container>
// //       </Box>
// //     </ThemeProvider>
// //   );
// // };

// // export default StatisticsDashboard;

// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   fetchGeneralStats,
//   fetchSubscriptionStats,
//   fetchPropertyStats,
//   // These are no longer needed as we'll handle the time period in the component.
//   // fetchPropertyTimeStats,
//   // fetchPropertyOperationTypeStats,
// } from '../../redux/superAdmin/statisticsSlice';
// import {
//   Container,
//   Grid,
//   Typography,
//   Paper,
//   Box,
//   ToggleButtonGroup,
//   ToggleButton,
// } from '@mui/material';
// import Chart from 'react-apexcharts';
// import CircularProgress from '@mui/material/CircularProgress';
// import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
// import { deepPurple, green, blueGrey, amber } from '@mui/material/colors';

// // Create a custom MUI theme
// let theme = createTheme({
//   palette: {
//     primary: { main: deepPurple[600] },
//     secondary: { main: green['A400'] },
//     background: { default: blueGrey[50], paper: '#fff' },
//   },
//   typography: {
//     fontFamily: 'Roboto, sans-serif',
//     h4: { fontWeight: 600, color: blueGrey[800] },
//     h5: { fontWeight: 500, color: blueGrey[700] },
//     h6: { fontWeight: 500, color: deepPurple[600] },
//     body1: { color: blueGrey[600] },
//   },
//   components: {
//     MuiPaper: {
//       styleOverrides: {
//         root: {
//           borderRadius: 16,
//           boxShadow: '0 4px 20px 0 rgba(0,0,0,0.08)',
//           transition: 'transform 0.2s',
//           '&:hover': { transform: 'translateY(-4px)' },
//         },
//       },
//     },
//   },
// });

// theme = responsiveFontSizes(theme);

// // Reusable Stat Card component
// const StatCard = ({ title, value }) => (
//   <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
//     <Typography variant="h6">{title}</Typography>
//     <Typography variant="h4" sx={{ mt: 1, color: deepPurple[500] }}>
//       {value}
//     </Typography>
//   </Paper>
// );

// // Consolidated chart component for all time-based data
// const CombinedTimeChart = ({ title, data, timePeriod, type, seriesName, color, valueKey }) => {
//   const chartData = data?.[timePeriod] || [];
//   const categories = chartData.map((item) => {
//     switch (timePeriod) {
//       case 'dailyStats':
//         return item.date;
//       case 'weeklyStats':
//         return `Week ${item.week}, ${item.year}`;
//       case 'monthlyStats':
//         return item.month;
//       case 'yearlyStats':
//         return item.year;
//       default:
//         return '';
//     }
//   });

//   const series = [
//     {
//       name: seriesName,
//       data: chartData.map((item) => item[valueKey]),
//     },
//   ];

//   const options = {
//     chart: { id: `${title}-${timePeriod}` },
//     xaxis: { categories: categories },
//     colors: [color],
//     tooltip: { theme: 'dark' },
//     stroke: { curve: 'smooth' },
//     dataLabels: { enabled: false },
//     yaxis: { labels: { formatter: (value) => value?.toFixed(0) } },
//   };

//   if (!chartData || chartData.length === 0) {
//     return (
//       <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
//         <Typography variant="h6" gutterBottom>
//           {title}
//         </Typography>
//         <Typography variant="body1" sx={{ py: 4 }}>
//           No data available for this period.
//         </Typography>
//       </Paper>
//     );
//   }

//   return (
//     <Paper elevation={3} sx={{ p: 3 }}>
//       <Typography variant="h6" gutterBottom>
//         {title}
//       </Typography>
//       <Chart options={options} series={series} type={type} height={350} />
//     </Paper>
//   );
// };

// // Main Dashboard Component
// const StatisticsDashboard = () => {
//   const dispatch = useDispatch();
//   const {
//     generalStats,
//     subscriptionStats,
//     propertyStats,
//     loading,
//     error,
//   } = useSelector((state) => state.statistics);

//   // State for the single time period selection
//   const [timePeriod, setTimePeriod] = useState('monthlyStats');

//   useEffect(() => {
//     // Dispatch all necessary actions on initial render
//     dispatch(fetchGeneralStats());
//     dispatch(fetchSubscriptionStats());
//     dispatch(fetchPropertyStats());
//     // These specific fetches are now redundant if the main fetches provide all data
//     // dispatch(fetchPropertyTimeStats());
//     // dispatch(fetchPropertyOperationTypeStats());
//   }, [dispatch]);

//   const handleTimePeriodChange = (event, newTimePeriod) => {
//     if (newTimePeriod !== null) {
//       setTimePeriod(newTimePeriod);
//     }
//   };

//   // Handle loading and error states
//   if (loading === 'pending') {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//         <CircularProgress color="primary" />
//       </Box>
//     );
//   }

//   if (loading === 'failed' || error) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//         <Typography variant="h5" color="error">
//           Error: {error || 'Failed to fetch data.'}
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ flexGrow: 1, p: 3, backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
//         <Container maxWidth="xl">
//           <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
//             Admin Dashboard 🚀
//           </Typography>

//           {/* General Statistics */}
//           <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
//             📊 General Statistics
//           </Typography>
//           <Grid container spacing={3}>
//             <Grid item xs={12} sm={6} md={6} lg={4}>
//               <StatCard
//                 title="Total Transactions"
//                 value={
//                   generalStats?.dailyStats.reduce((sum, item) => sum + item.transactionCount, 0) ||
//                   0
//                 }
//               />
//             </Grid>
//             <Grid item xs={12} sm={6} md={6} lg={4}>
//               <StatCard
//                 title="Total Revenue"
//                 value={`$${(
//                   generalStats?.dailyStats.reduce((sum, item) => sum + item.totalAmount, 0) || 0
//                 ).toFixed(2)}`}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6} md={6} lg={4}>
//               <StatCard
//                 title="Total Subscriptions"
//                 value={subscriptionStats?.totalSubscriptions || 0}
//               />
//             </Grid>
//           </Grid>

//           <Box mb={2} display="flex" justifyContent="center" sx={{ mt: 4 }}>
//             <ToggleButtonGroup
//               value={timePeriod}
//               exclusive
//               onChange={handleTimePeriodChange}
//               aria-label="time period"
//               color="primary"
//             >
//               <ToggleButton value="yearlyStats">Yearly</ToggleButton>
//               <ToggleButton value="monthlyStats">Monthly</ToggleButton>
//               <ToggleButton value="weeklyStats">Weekly</ToggleButton>
//               <ToggleButton value="dailyStats">Daily</ToggleButton>
//             </ToggleButtonGroup>
//           </Box>

//           <Grid container spacing={4}>
//             <Grid item xs={12} md={6} width={'45%'}>
//               <CombinedTimeChart
//                 title="General Revenue"
//                 data={generalStats}
//                 timePeriod={timePeriod}
//                 type="line"
//                 seriesName="Revenue"
//                 color={deepPurple[400]}
//                 valueKey="totalAmount"
//               />
//             </Grid>
//             <Grid item xs={12} md={6} width={'45%'}>
//               <CombinedTimeChart
//                 title="General Transaction Count"
//                 data={generalStats}
//                 timePeriod={timePeriod}
//                 type="bar"
//                 seriesName="Transaction Count"
//                 color={green['A400']}
//                 valueKey="transactionCount"
//               />
//             </Grid>
//           </Grid>

//           <Box
//             mb={2}
//             display="flex"
//             justifyContent="center"
//             sx={{ mt: 4 }}
//           >
//             <ToggleButtonGroup
//               value={timePeriod}
//               exclusive
//               onChange={handleTimePeriodChange}
//               aria-label="time period"
//               color="primary"
//             >
//               <ToggleButton value="yearlyStats">Yearly</ToggleButton>
//               <ToggleButton value="monthlyStats">Monthly</ToggleButton>
//               <ToggleButton value="weeklyStats">Weekly</ToggleButton>
//               <ToggleButton value="dailyStats">Daily</ToggleButton>
//             </ToggleButtonGroup>
//           </Box>
//           ---

//           {/* Subscription Statistics */}
//           <Typography variant="h5" sx={{ mt: 6, mb: 2 }}>
//             ⭐ Subscription Statistics
//           </Typography>
//           <Grid container spacing={4}>
//             <Grid item xs={12} md={6}>
//               <Paper elevation={3} sx={{ p: 3 }}>
//                 <Typography variant="h6" gutterBottom>
//                   Subscriptions by Plan
//                 </Typography>
//                 {subscriptionStats?.length > 0 ? (
//                   <Chart
//                     options={{
//                       chart: { id: 'subscription-stats' },
//                       labels: subscriptionStats?.map((item) => item.plan) || [],
//                       colors: [amber[500], deepPurple[400], green[400]],
//                       legend: { position: 'bottom' },
//                       tooltip: { theme: 'dark' },
//                     }}
//                     series={subscriptionStats?.map((item) => item.count) || []}
//                     type="donut"
//                     height={350}
//                   />
//                 ) : (
//                   <Typography variant="body1" align="center" sx={{ py: 4 }}>
//                     No subscription data available.
//                   </Typography>
//                 )}
//               </Paper>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <CombinedTimeChart
//                 title="Subscription Revenue Over Time"
//                 data={subscriptionStats}
//                 timePeriod={timePeriod}
//                 type="area"
//                 seriesName="Revenue"
//                 color={amber[500]}
//                 valueKey="totalAmount"
//               />
//             </Grid>
//           </Grid>

//           <Box
//             mb={2}
//             display="flex"
//             justifyContent="center"
//             sx={{ mt: 4 }}
//           >
//             <ToggleButtonGroup
//               value={timePeriod}
//               exclusive
//               onChange={handleTimePeriodChange}
//               aria-label="time period"
//               color="primary"
//             >
//               <ToggleButton value="yearlyStats">Yearly</ToggleButton>
//               <ToggleButton value="monthlyStats">Monthly</ToggleButton>
//               <ToggleButton value="weeklyStats">Weekly</ToggleButton>
//               <ToggleButton value="dailyStats">Daily</ToggleButton>
//             </ToggleButtonGroup>
//           </Box>
//           ---

//           {/* Property Statistics */}
//           <Typography variant="h5" sx={{ mt: 6, mb: 2 }}>
//             🏡 Property Statistics
//           </Typography>
//           <Grid container spacing={4}>
//             <Grid item xs={12} md={6}>
//               <Paper elevation={3} sx={{ p: 3 }}>
//                 <Typography variant="h6" gutterBottom>
//                   Properties by Operation Type
//                 </Typography>
//                 {propertyStats?.operationTypeStats?.length > 0 ? (
//                   <Chart
//                     options={{
//                       chart: { id: 'property-op-type-chart' },
//                       xaxis: {
//                         categories:
//                           propertyStats?.operationTypeStats?.map((item) => item.operationType) || [],
//                       },
//                       colors: [deepPurple[400], green['A400']],
//                       tooltip: { theme: 'dark' },
//                     }}
//                     series={[
//                       {
//                         name: 'Property Count',
//                         data:
//                           propertyStats?.operationTypeStats?.map((item) => item.transactionCount) ||
//                           [],
//                       },
//                     ]}
//                     type="bar"
//                     height={350}
//                   />
//                 ) : (
//                   <Typography variant="body1" align="center" sx={{ py: 4 }}>
//                     No property operation data available.
//                   </Typography>
//                 )}
//               </Paper>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <CombinedTimeChart
//                 title="New Properties Over Time"
//                 data={propertyStats}
//                 timePeriod={timePeriod}
//                 type="line"
//                 seriesName="New Properties"
//                 color={amber[500]}
//                 valueKey="transactionCount"
//               />
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default StatisticsDashboard;

// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   fetchGeneralStats,
//   fetchSubscriptionStats,
//   fetchPropertyStats,
// } from '../../redux/superAdmin/statisticsSlice';
// import {
//   Container,
//   Grid,
//   Typography,
//   Paper,
//   Box,
//   ToggleButtonGroup,
//   ToggleButton,
// } from '@mui/material';
// import Chart from 'react-apexcharts';
// import CircularProgress from '@mui/material/CircularProgress';
// import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
// import { deepPurple, green, blueGrey, amber } from '@mui/material/colors';

// // Create a custom MUI theme
// let theme = createTheme({
//   palette: {
//     primary: { main: deepPurple[600] },
//     secondary: { main: green['A400'] },
//     background: { default: blueGrey[50], paper: '#fff' },
//   },
//   typography: {
//     fontFamily: 'Roboto, sans-serif',
//     h4: { fontWeight: 600, color: blueGrey[800] },
//     h5: { fontWeight: 500, color: blueGrey[700] },
//     h6: { fontWeight: 500, color: deepPurple[600] },
//     body1: { color: blueGrey[600] },
//   },
//   components: {
//     MuiPaper: {
//       styleOverrides: {
//         root: {
//           borderRadius: 16,
//           boxShadow: '0 4px 20px 0 rgba(0,0,0,0.08)',
//           transition: 'transform 0.2s',
//           '&:hover': { transform: 'translateY(-4px)' },
//         },
//       },
//     },
//   },
// });

// theme = responsiveFontSizes(theme);

// // Reusable Stat Card component
// const StatCard = ({ title, value }) => (
//   <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
//     <Typography variant="h6">{title}</Typography>
//     <Typography variant="h4" sx={{ mt: 1, color: deepPurple[500] }}>
//       {value}
//     </Typography>
//   </Paper>
// );

// // Consolidated chart component for all time-based data
// const CombinedTimeChart = ({ title, data, timePeriod, type, seriesName, color, valueKey }) => {
//   const chartData = data?.[timePeriod] || [];
//   const categories = chartData.map((item) => {
//     switch (timePeriod) {
//       case 'dailyStats':
//         return item.date;
//       case 'weeklyStats':
//         return `Week ${item.week}, ${item.year}`;
//       case 'monthlyStats':
//         return item.month;
//       case 'yearlyStats':
//         return item.year;
//       default:
//         return '';
//     }
//   });

//   const series = [
//     {
//       name: seriesName,
//       data: chartData.map((item) => item[valueKey]),
//     },
//   ];

//   const options = {
//     chart: { id: `${title}-${timePeriod}` },
//     xaxis: { categories: categories },
//     colors: [color],
//     tooltip: { theme: 'dark' },
//     stroke: { curve: 'smooth' },
//     dataLabels: { enabled: false },
//     yaxis: { labels: { formatter: (value) => value?.toFixed(0) } },
//   };

//   if (!chartData || chartData.length === 0) {
//     return (
//       <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
//         <Typography variant="h6" gutterBottom>
//           {title}
//         </Typography>
//         <Typography variant="body1" sx={{ py: 4 }}>
//           No data available for this period.
//         </Typography>
//       </Paper>
//     );
//   }

//   return (
//     <Paper elevation={3} sx={{ p: 3 }}>
//       <Typography variant="h6" gutterBottom>
//         {title}
//       </Typography>
//       <Chart options={options} series={series} type={type} height={350} />
//     </Paper>
//   );
// };

// // Main Dashboard Component
// const StatisticsDashboard = () => {
//   const dispatch = useDispatch();
//   const {
//     generalStats,
//     subscriptionStats,
//     propertyStats,
//     loading,
//     error,
//   } = useSelector((state) => state.statistics);

//   // State variables for each section's time period
//   const [generalTimePeriod, setGeneralTimePeriod] = useState('monthlyStats');
//   const [subscriptionTimePeriod, setSubscriptionTimePeriod] = useState('monthlyStats');
//   const [propertyTimePeriod, setPropertyTimePeriod] = useState('monthlyStats');

//   useEffect(() => {
//     dispatch(fetchGeneralStats());
//     dispatch(fetchSubscriptionStats());
//     dispatch(fetchPropertyStats());
//   }, [dispatch]);

//   // Handler functions for each section's time period
//   const handleGeneralTimePeriodChange = (event, newTimePeriod) => {
//     if (newTimePeriod !== null) {
//       setGeneralTimePeriod(newTimePeriod);
//     }
//   };

//   const handleSubscriptionTimePeriodChange = (event, newTimePeriod) => {
//     if (newTimePeriod !== null) {
//       setSubscriptionTimePeriod(newTimePeriod);
//     }
//   };

//   const handlePropertyTimePeriodChange = (event, newTimePeriod) => {
//     if (newTimePeriod !== null) {
//       setPropertyTimePeriod(newTimePeriod);
//     }
//   };

//   // Handle loading and error states
//   if (loading === 'pending') {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//         <CircularProgress color="primary" />
//       </Box>
//     );
//   }

//   if (loading === 'failed' || error) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//         <Typography variant="h5" color="error">
//           Error: {error || 'Failed to fetch data.'}
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ flexGrow: 1, p: 3, backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
//         <Container maxWidth="xl">
//           <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
//             Admin Dashboard 🚀
//           </Typography>

//           {/* General Statistics */}
//           <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
//             📊 General Statistics
//           </Typography>
//           <Grid container spacing={3}>
//             <Grid item xs={12} sm={6} md={6} lg={4}>
//               <StatCard
//                 title="Total Transactions"
//                 value={
//                   generalStats?.dailyStats.reduce((sum, item) => sum + item.transactionCount, 0) ||
//                   0
//                 }
//               />
//             </Grid>
//             <Grid item xs={12} sm={6} md={6} lg={4}>
//               <StatCard
//                 title="Total Revenue"
//                 value={`$${(
//                   generalStats?.dailyStats.reduce((sum, item) => sum + item.totalAmount, 0) || 0
//                 ).toFixed(2)}`}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6} md={6} lg={4}>
//               <StatCard
//                 title="Total Subscriptions"
//                 value={subscriptionStats?.totalSubscriptions || 0}
//               />
//             </Grid>
//           </Grid>

//           <Box mb={2} display="flex" justifyContent="center" sx={{ mt: 4 }}>
//             <ToggleButtonGroup
//               value={generalTimePeriod}
//               exclusive
//               onChange={handleGeneralTimePeriodChange}
//               aria-label="general time period"
//               color="primary"
//             >
//               <ToggleButton value="yearlyStats">Yearly</ToggleButton>
//               <ToggleButton value="monthlyStats">Monthly</ToggleButton>
//               <ToggleButton value="weeklyStats">Weekly</ToggleButton>
//               <ToggleButton value="dailyStats">Daily</ToggleButton>
//             </ToggleButtonGroup>
//           </Box>

//           <Grid container spacing={4}>
//             <Grid item xs={12} md={6}>
//               <CombinedTimeChart
//                 title="General Revenue"
//                 data={generalStats}
//                 timePeriod={generalTimePeriod}
//                 type="line"
//                 seriesName="Revenue"
//                 color={deepPurple[400]}
//                 valueKey="totalAmount"
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <CombinedTimeChart
//                 title="General Transaction Count"
//                 data={generalStats}
//                 timePeriod={generalTimePeriod}
//                 type="bar"
//                 seriesName="Transaction Count"
//                 color={green['A400']}
//                 valueKey="transactionCount"
//               />
//             </Grid>
//           </Grid>

//           ---

//           {/* Subscription Statistics */}
//           <Typography variant="h5" sx={{ mt: 6, mb: 2 }}>
//             ⭐ Subscription Statistics
//           </Typography>

//           <Box mb={2} display="flex" justifyContent="center" sx={{ mt: 4 }}>
//             <ToggleButtonGroup
//               value={subscriptionTimePeriod}
//               exclusive
//               onChange={handleSubscriptionTimePeriodChange}
//               aria-label="subscription time period"
//               color="primary"
//             >
//               <ToggleButton value="yearlyStats">Yearly</ToggleButton>
//               <ToggleButton value="monthlyStats">Monthly</ToggleButton>
//               <ToggleButton value="weeklyStats">Weekly</ToggleButton>
//               <ToggleButton value="dailyStats">Daily</ToggleButton>
//             </ToggleButtonGroup>
//           </Box>

//           <Grid container spacing={4}>
//             <Grid item xs={12} md={6}>
//               <Paper elevation={3} sx={{ p: 3 }}>
//                 <Typography variant="h6" gutterBottom>
//                   Subscriptions by Plan
//                 </Typography>
//                 {subscriptionStats?.length > 0 ? (
//                   <Chart
//                     options={{
//                       chart: { id: 'subscription-stats' },
//                       labels: subscriptionStats?.map((item) => item.plan) || [],
//                       colors: [amber[500], deepPurple[400], green[400]],
//                       legend: { position: 'bottom' },
//                       tooltip: { theme: 'dark' },
//                     }}
//                     series={subscriptionStats?.map((item) => item.count) || []}
//                     type="donut"
//                     height={350}
//                   />
//                 ) : (
//                   <Typography variant="body1" align="center" sx={{ py: 4 }}>
//                     No subscription data available.
//                   </Typography>
//                 )}
//               </Paper>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <CombinedTimeChart
//                 title="Subscription Revenue Over Time"
//                 data={subscriptionStats}
//                 timePeriod={subscriptionTimePeriod}
//                 type="area"
//                 seriesName="Revenue"
//                 color={amber[500]}
//                 valueKey="totalAmount"
//               />
//             </Grid>
//           </Grid>

//           ---

//           {/* Property Statistics */}
//           <Typography variant="h5" sx={{ mt: 6, mb: 2 }}>
//             🏡 Property Statistics
//           </Typography>
//           <Box mb={2} display="flex" justifyContent="center" sx={{ mt: 4 }}>
//             <ToggleButtonGroup
//               value={propertyTimePeriod}
//               exclusive
//               onChange={handlePropertyTimePeriodChange}
//               aria-label="property time period"
//               color="primary"
//             >
//               <ToggleButton value="yearlyStats">Yearly</ToggleButton>
//               <ToggleButton value="monthlyStats">Monthly</ToggleButton>
//               <ToggleButton value="weeklyStats">Weekly</ToggleButton>
//               <ToggleButton value="dailyStats">Daily</ToggleButton>
//             </ToggleButtonGroup>
//           </Box>
//           <Grid container spacing={4}>
//             <Grid item xs={12} md={6}>
//               <Paper elevation={3} sx={{ p: 3 }}>
//                 <Typography variant="h6" gutterBottom>
//                   Properties by Operation Type
//                 </Typography>
//                 {propertyStats?.operationTypeStats?.length > 0 ? (
//                   <Chart
//                     options={{
//                       chart: { id: 'property-op-type-chart' },
//                       xaxis: {
//                         categories:
//                           propertyStats?.operationTypeStats?.map((item) => item.operationType) || [],
//                       },
//                       colors: [deepPurple[400], green['A400']],
//                       tooltip: { theme: 'dark' },
//                     }}
//                     series={[
//                       {
//                         name: 'Property Count',
//                         data:
//                           propertyStats?.operationTypeStats?.map((item) => item.transactionCount) ||
//                           [],
//                       },
//                     ]}
//                     type="bar"
//                     height={350}
//                   />
//                 ) : (
//                   <Typography variant="body1" align="center" sx={{ py: 4 }}>
//                     No property operation data available.
//                   </Typography>
//                 )}
//               </Paper>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <CombinedTimeChart
//                 title="New Properties Over Time"
//                 data={propertyStats}
//                 timePeriod={propertyTimePeriod}
//                 type="line"
//                 seriesName="New Properties"
//                 color={amber[500]}
//                 valueKey="transactionCount"
//               />
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default StatisticsDashboard;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchGeneralStats,
  fetchSubscriptionStats,
  fetchPropertyStats,
} from "../../redux/superAdmin/statisticsSlice";
import {
  Container,
  Grid,
  Typography,
  Paper,
  Box,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import Chart from "react-apexcharts";
import CircularProgress from "@mui/material/CircularProgress";
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";
import { deepPurple, green, blueGrey, amber } from "@mui/material/colors";

// Create a custom MUI theme
let theme = createTheme({
  palette: {
    primary: { main: deepPurple[600] },
    secondary: { main: green["A400"] },
    background: { default: blueGrey[50], paper: "#fff" },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h4: { fontWeight: 600, color: blueGrey[800] },
    h5: { fontWeight: 500, color: blueGrey[700] },
    h6: { fontWeight: 500, color: deepPurple[600] },
    body1: { color: blueGrey[600] },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 4px 20px 0 rgba(0,0,0,0.08)",
          transition: "transform 0.2s",
          "&:hover": { transform: "translateY(-4px)" },
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

// Reusable Stat Card component
const StatCard = ({ title, value }) => (
  <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
    <Typography variant="h6">{title}</Typography>
    <Typography variant="h4" sx={{ mt: 1, color: deepPurple[500] }}>
      {value}
    </Typography>
  </Paper>
);

// Consolidated chart component for all time-based data
const CombinedTimeChart = ({
  title,
  data,
  timePeriod,
  type,
  seriesName,
  color,
  valueKey,
}) => {
  const chartData = data?.[timePeriod] || [];
  const categories = chartData.map((item) => {
    switch (timePeriod) {
      case "dailyStats":
        return item.date;
      case "weeklyStats":
        return `Week ${item.week}, ${item.year}`;
      case "monthlyStats":
        return item.month;
      case "yearlyStats":
        return item.year;
      default:
        return "";
    }
  });

  const series = [
    {
      name: seriesName,
      data: chartData.map((item) => item[valueKey]),
    },
  ];

  const options = {
    chart: { id: `${title}-${timePeriod}` },
    xaxis: { categories: categories },
    colors: [color],
    tooltip: { theme: "dark" },
    stroke: { curve: "smooth" },
    dataLabels: { enabled: false },
    yaxis: { labels: { formatter: (value) => value?.toFixed(0) } },
  };

  if (!chartData || chartData.length === 0) {
    return (
      <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" sx={{ py: 4 }}>
          No data available for this period.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Chart options={options} series={series} type={type} height={350} />
    </Paper>
  );
};

// Main Dashboard Component
const StatisticsDashboard = () => {
  const dispatch = useDispatch();
  const { generalStats, subscriptionStats, propertyStats, loading, error } =
    useSelector((state) => state.statistics);

  // State variables for each section's time period
  const [generalTimePeriod, setGeneralTimePeriod] = useState("monthlyStats");
  const [subscriptionTimePeriod, setSubscriptionTimePeriod] =
    useState("monthlyStats");
  const [propertyTimePeriod, setPropertyTimePeriod] = useState("monthlyStats");

  useEffect(() => {
    dispatch(fetchGeneralStats());
    dispatch(fetchSubscriptionStats());
    dispatch(fetchPropertyStats());
  }, [dispatch]);

  // Handler functions for each section's time period
  const handleGeneralTimePeriodChange = (event, newTimePeriod) => {
    if (newTimePeriod !== null) {
      setGeneralTimePeriod(newTimePeriod);
    }
  };

  const handleSubscriptionTimePeriodChange = (event, newTimePeriod) => {
    if (newTimePeriod !== null) {
      setSubscriptionTimePeriod(newTimePeriod);
    }
  };

  const handlePropertyTimePeriodChange = (event, newTimePeriod) => {
    if (newTimePeriod !== null) {
      setPropertyTimePeriod(newTimePeriod);
    }
  };

  // Handle loading and error states
  if (loading === "pending") {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (loading === "failed" || error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h5" color="error">
          Error: {error || "Failed to fetch data."}
        </Typography>
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        // sx={{
        //   flexGrow: 1,
        //   p: 3,
        //   backgroundColor: theme.palette.background.default,
        //   minHeight: "100vh",
        // }}

        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          flexGrow: 1,
          p: 3,
          backgroundColor: theme.palette.background.default,
          // Add these three lines
          flexDirection: "column",
          textAlign: "center",
          "& > *": {
            width: "100%",
          },
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
            Admin Dashboard 🚀
          </Typography>
          {/* General Statistics */}
          <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
            📊 General Statistics
          </Typography>
          <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Grid item xs={12} sm={6} md={6} lg={4}>
              <StatCard
                title="Total Transactions"
                value={
                  generalStats?.dailyStats.reduce(
                    (sum, item) => sum + item.transactionCount,
                    0
                  ) || 0
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4}>
              <StatCard
                title="Total Revenue"
                value={`$${(
                  generalStats?.dailyStats.reduce(
                    (sum, item) => sum + item.totalAmount,
                    0
                  ) || 0
                ).toFixed(2)}`}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4}>
              <StatCard
                title="Total Subscriptions"
                value={subscriptionStats?.dailyStats?.length || 0}
              />
            </Grid>
          </Grid>
          <Box mb={2} display="flex" justifyContent="center" sx={{ mt: 4 }}>
            <ToggleButtonGroup
              value={generalTimePeriod}
              exclusive
              onChange={handleGeneralTimePeriodChange}
              aria-label="general time period"
              color="primary"
            >
              <ToggleButton value="yearlyStats">Yearly</ToggleButton>
              <ToggleButton value="monthlyStats">Monthly</ToggleButton>
              <ToggleButton value="weeklyStats">Weekly</ToggleButton>
              <ToggleButton value="dailyStats">Daily</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Grid item xs={12} md={6} width={'45%'}>
              <CombinedTimeChart 
              
                title="General Revenue"
                data={generalStats}
                timePeriod={generalTimePeriod}
                type="line"
                seriesName="Revenue"
                color={deepPurple[400]}
                valueKey="totalAmount"
              />
            </Grid>
            <Grid item xs={12} md={6} width={'45%'}>
              <CombinedTimeChart
                title="General Transaction Count"
                data={generalStats}
                timePeriod={generalTimePeriod}
                type="bar"
                seriesName="Transaction Count"
                color={green["A400"]}
                valueKey="transactionCount"
              />
            </Grid>
          </Grid>
          ---
          {/* Subscription Statistics */}
          <Typography variant="h5" sx={{ mt: 6, mb: 2 }}>
            ⭐ Subscription Statistics
          </Typography>
          <Box mb={2} display="flex" justifyContent="center" sx={{ mt: 4 }}>
            <ToggleButtonGroup
              value={subscriptionTimePeriod}
              exclusive
              onChange={handleSubscriptionTimePeriodChange}
              aria-label="subscription time period"
              color="primary"
            >
              <ToggleButton value="yearlyStats">Yearly</ToggleButton>
              <ToggleButton value="monthlyStats">Monthly</ToggleButton>
              <ToggleButton value="weeklyStats">Weekly</ToggleButton>
              <ToggleButton value="dailyStats">Daily</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Grid item xs={12} md={6} width={'45%'}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Subscriptions by Plan
                </Typography>
                {subscriptionStats?.plan?.length > 0 ? (
                  <Chart
                    options={{
                      chart: { id: "property-op-type-chart" },
                      xaxis: {
                        categories:
                          subscriptionStats?.plan?.map(
                            (item) => item.planName
                          ) || [],
                      },
                      colors: [deepPurple[400], green["A400"]],
                      tooltip: { theme: "dark" },
                    }}
                    series={[
                      {
                        name: "Property Count",
                        data:
                          subscriptionStats?.plan?.map(
                            (item) => item.transactionCount
                          ) || [],
                      },
                    ]}
                    type="bar"
                    height={350}
                  />
                ) : (
                  <Typography variant="body1" align="center" sx={{ py: 4 }}>
                    No subscription data available.
                  </Typography>
                )}
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} width={'45%'}>
              <CombinedTimeChart
                title="Subscription Revenue Over Time"
                data={subscriptionStats}
                timePeriod={subscriptionTimePeriod}
                type="area"
                seriesName="Revenue"
                color={amber[500]}
                valueKey="totalAmount"
              />
            </Grid>
          </Grid>
          ---
          {/* Property Statistics */}
          <Typography variant="h5" sx={{ mt: 6, mb: 2 }}>
            🏡 Property Statistics
          </Typography>
          <Box mb={2} display="flex" justifyContent="center" sx={{ mt: 4 }}>
            <ToggleButtonGroup
              value={propertyTimePeriod}
              exclusive
              onChange={handlePropertyTimePeriodChange}
              aria-label="property time period"
              color="primary"
            >
              <ToggleButton value="yearlyStats">Yearly</ToggleButton>
              <ToggleButton value="monthlyStats">Monthly</ToggleButton>
              <ToggleButton value="weeklyStats">Weekly</ToggleButton>
              <ToggleButton value="dailyStats">Daily</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Grid item xs={12} md={6}  width={'45%'}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Properties by Operation Type
                </Typography>
                {propertyStats?.operationTypeStats?.length > 0 ? (
                  <Chart
                    options={{
                      chart: { id: "property-op-type-chart" },
                      xaxis: {
                        categories:
                          propertyStats?.operationTypeStats?.map(
                            (item) => item.operationType
                          ) || [],
                      },
                      colors: [deepPurple[400], green["A400"]],
                      tooltip: { theme: "dark" },
                    }}
                    series={[
                      {
                        name: "Property Count",
                        data:
                          propertyStats?.operationTypeStats?.map(
                            (item) => item.transactionCount
                          ) || [],
                      },
                    ]}
                    type="bar"
                    height={350}
                  />
                ) : (
                  <Typography variant="body1" align="center" sx={{ py: 4 }}>
                    No property operation data available.
                  </Typography>
                )}
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} width={'45%'}>
              <CombinedTimeChart
                title="New Properties Over Time"
                data={propertyStats}
                timePeriod={propertyTimePeriod}
                type="line"
                seriesName="New Properties"
                color={amber[500]}
                valueKey="transactionCount"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default StatisticsDashboard;
