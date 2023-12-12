import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { resetContainer, setContainer } from '../store/containerSlice';
import { axiosAPI } from '../api';

export default function DeviceScreen({ route }) {
    const { uuid } = route.params;
    const dispatch = useDispatch();
    const { container } = useSelector((store) => store.container);

    useEffect(() => {
        async function getOneContainer() {
            await axiosAPI.get(`/containers/${uuid}`).then((response) => dispatch(setContainer(response?.data)));
        }
        getOneContainer();
        return () => {
            dispatch(resetContainer());
        };
    }, [dispatch]);
    return (
        <View>
            <Text>{container.marking}</Text>
        </View>
    );
}