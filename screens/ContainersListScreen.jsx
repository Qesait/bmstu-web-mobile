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

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent} style={styles.page}>
            {containers && containers.length > 0 ? (
                containers.map((container) => <ContainerCard key={container.uuid} {...{ marking: container.marking, type: container.type, cargo: container.cargo, weight: container.weight}} navigation={navigation} />)
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
        alignItems: 'stretch',
        padding: 0,
    },
    page: {
        backgroundColor: '#ffffff',
        padding: 8,
    },
});


