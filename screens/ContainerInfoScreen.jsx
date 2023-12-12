import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { resetContainer, setContainer } from '../store/containerSlice';
import { getContainer } from '../api';

export default function DeviceScreen({ route }) {
    const { uuid } = route.params;
    const dispatch = useDispatch();
    const { container } = useSelector((store) => store.container);

    useEffect(() => {
        getContainer(uuid).then(data => dispatch(setContainer(data)))

        return () => {
            dispatch(resetContainer());
        };
    }, [dispatch]);
    return (
        <View style={styles.ViewContent}>
            {container ? (
                <Text>{container.marking}</Text>
            ) : (
                <ActivityIndicator size="large" color="#ffffff" />
            )}
        </View >
    );
}

const styles = StyleSheet.create({
    ViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});