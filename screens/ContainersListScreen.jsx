import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { axiosAPI } from '../api';
import { setContainers } from '../store/containerSlice';
import ContainerCard from '../components/ContainerCard';

export default function ContainersListScreen({ navigation }) {
    const dispatch = useDispatch();
    const { containers } = useSelector((store) => store.container);

    useEffect(() => {
        async function getAllContainers() {
            await axiosAPI.get('/containers').then((response) => dispatch(setContainers(response?.data.containers)));
        }
        getAllContainers();
    }, [dispatch]);

    return (
        <ScrollView>
            <View style={styles.page}>
                {!!containers &&
                    containers.map((container) => <ContainerCard key={container.uuid} {...container} navigation={navigation} />)}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    page: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2a2a2a',
    },
});


