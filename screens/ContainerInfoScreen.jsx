import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { resetContainer, setContainer } from '../store/containerSlice';
import { getContainer, imageBaseURL } from '../api';

const placeholder = require(`../assets/placeholder.jpg`)

export default function DeviceScreen({ route }) {
    const { uuid } = route.params;
    const dispatch = useDispatch();
    const { container } = useSelector((store) => store.container);
    const [src, setSrc] = useState({ uri: `${imageBaseURL}/${uuid}.jpg` });

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
                <View padding='0' style={[styles.card, styles.shadow, styles.border]}>
                    <View style={[styles.imageWrapper, styles.border]}>
                        <Image
                            style={styles.image}
                            source={src}
                            onError={() => setSrc(placeholder)}
                        />
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.title}>{container.marking}</Text>
                        <Text style={styles.text}>Тип: {container.type}</Text>
                        <Text style={styles.text}>Длина: {container.length}</Text>
                        <Text style={styles.text}>Высота: {container.height}</Text>
                        <Text style={styles.text}>Ширина: {container.width}</Text>
                        <Text style={styles.text}>Груз: {container.cargo}</Text>
                        <Text style={styles.text}>Вес: {container.weight} кг</Text>
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
        margin: 10,
        paddingBottom: 10,
    },
    border: {
        borderRadius: 6,
    },
    shadow: {
        shadowColor: '#4133B7',
        shadowOffset: { width: 0, height: 30 },
        shadowOpacity: 0.25,
        shadowRadius: 30,
        elevation: 10,
        padding: 10,
        borderRadius: 10,
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
    title: {
        color: '#212529',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    text: {
        color: '#212529',
        fontSize: 16,
        textAlign: 'center',
    },
});