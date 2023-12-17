import { View, Text, ActivityIndicator, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { resetContainer, setContainer } from '../store/containerSlice';
import { getContainer, imageBaseURL } from '../api';
import { commonStyles } from '../styles/common'

const placeholder = require(`../assets/placeholder.jpg`)

export default function DeviceScreen({ navigation, route }) {
    const { uuid } = route.params;
    const dispatch = useDispatch();
    const { container } = useSelector((store) => store.container);
    const [src, setSrc] = useState({ uri: `${imageBaseURL}/${uuid}.jpg` });

    // const handlePress = () => {
    //     navigation.navigate('ContainersList');
    // };

    useEffect(() => {
        getContainer(uuid).then(data => {
            console.log(data)
            dispatch(setContainer(data))
        })
        console.log(container)

        return () => {
            dispatch(resetContainer());
        };
    }, [dispatch]);
    return (
        <View style={styles.ViewContent}>
            {container ? (
                <View>
                    {/* <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
                        <TouchableOpacity
                            onPress={handlePress}
                        >
                            <Text style={styles.text}>Контейнеры</Text>
                        </TouchableOpacity>
                        <Text style={styles.text}> / {container.marking}</Text>
                    </View> */}
                    <View style={[styles.card, commonStyles.shadow, commonStyles.rounded]}>
                        <View style={[styles.imageWrapper, commonStyles.rounded]}>
                            <Image
                                style={styles.image}
                                source={src}
                                onError={() => setSrc(placeholder)}
                            />
                        </View>
                        <View style={styles.container}>
                            <Text style={[commonStyles.title, commonStyles.centerText]}>{container.marking}</Text>
                            <Text style={[commonStyles.text, commonStyles.centerText]}>Тип: {container.type}</Text>
                            <Text style={[commonStyles.text, commonStyles.centerText]}>Длина: {container.length}</Text>
                            <Text style={[commonStyles.text, commonStyles.centerText]}>Высота: {container.height}</Text>
                            <Text style={[commonStyles.text, commonStyles.centerText]}>Ширина: {container.width}</Text>
                            <Text style={[commonStyles.text, commonStyles.centerText]}>Груз: {container.cargo}</Text>
                            <Text style={[commonStyles.text, commonStyles.centerText]}>Вес: {container.weight} кг</Text>
                        </View>
                    </View>
                </View>
            ) : (
                <View style={styles.ActivityWrapper}>
                    <ActivityIndicator size="large" color="#212529" />
                </View >
            )}
        </View >
    );
}

const styles = StyleSheet.create({
    ViewContent: {
        flexGrow: 1,
        alignItems: 'stretch',
        padding: 10,
    },
    ActivityWrapper: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        paddingHorizontal: 0,
        paddingTop: 0,
        overflow: 'hidden',
        gap: 14,
        paddingBottom: 10,
    },
    image: {
        flex: 1,
        width: '100%',
        resizeMode: 'cover',
    },
    imageWrapper: {
        overflow: 'hidden',
        aspectRatio: 16 / 10,
        margin: 0,
    },
    container: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        paddingHorizontal: 4,
        gap: 6,
    },
});