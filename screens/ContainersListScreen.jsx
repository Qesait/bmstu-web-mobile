import { ScrollView, StyleSheet, View, ActivityIndicator, TextInput, TouchableOpacity, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { getAllContainers } from '../api';
import { setContainers, setSearch } from '../store/containerSlice';
import ContainerCard from '../components/ContainerCard';
import Spinner from '../components/Spinner';
import { commonStyles } from '../styles/common'

export default function ContainersListScreen({ navigation }) {
    const dispatch = useDispatch();
    const { containers } = useSelector((store) => store.container);
    const { searchText } = useSelector((store) => store.container);

    useEffect(() => {
        getAllContainers(searchText).then(data => {
            dispatch(setContainers(data?.containers))
        })
    }, [dispatch]);

    const handleSearch = () => {
        getAllContainers(searchText).then(data => {
            console.log(data.containers.length)
            dispatch(setContainers(data?.containers))
        })
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.container}>
                <TextInput
                    style={[styles.input, commonStyles.rounded_sm, commonStyles.shadow_sm]}
                    placeholder="Тип контейнера"
                    value={searchText}
                    onChangeText={(text) => dispatch(setSearch(text))}
                    placeholderTextColor={'#aeb2b6'}
                    onSubmitEditing={handleSearch}
                />
                <TouchableOpacity style={[styles.button, commonStyles.rounded_sm, commonStyles.shadow]} onPress={handleSearch}>
                    <Text style={styles.buttonText}>Поиск</Text>
                </TouchableOpacity>
            </View>
            {containers && containers.length > 0 ? (
                containers.map((container) => <ContainerCard key={container.uuid} {...{ uuid: container.uuid, marking: container.marking, type: container.type, cargo: container.cargo, weight: container.weight }} style={commonStyles.shadow} navigation={navigation} />)
            ) : (
                !containers && <Spinner />
            )}
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        padding: 10,
        gap: 10,
        backgroundColor: '#ffffff',
    },
    input: {
        flex: 1,
        backgroundColor: '#212529',
        paddingHorizontal: 12,
        paddingVertical: 2,
        marginRight: 8,
        color: 'white',
        fontSize: 14,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // paddingHorizontal: 16,
        marginBottom: 4,
    },
    button: {
        backgroundColor: '#520dc2',
        paddingVertical: 6,
        paddingHorizontal: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        // fontWeight: 'bold',
    },
});


