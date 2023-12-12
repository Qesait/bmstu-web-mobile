import { ScrollView, StyleSheet, View, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { getAllContainers } from '../api';
import { setContainers } from '../store/containerSlice';
import ContainerCard from '../components/ContainerCard';

export default function ContainersListScreen({ navigation }) {
    const dispatch = useDispatch();
    const { containers } = useSelector((store) => store.container);

    useEffect(() => {
        getAllContainers().then(data => {
            dispatch(setContainers(data?.containers))
        })
    }, [dispatch]);
    console.log(!!containers && containers.length > 0)

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {containers && containers.length > 0 ? (
                containers.map((container) => <ContainerCard key={container.uuid} {...container} navigation={navigation} />)
            ) : (
                <ActivityIndicator size="large" color="#ffffff" />
            )}
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    page: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2a2a2a',
    },
});


