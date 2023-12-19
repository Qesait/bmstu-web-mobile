import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useState, React, useEffect } from 'react';
import { axiosImage, imagePlaceholder, ReplaceIP } from '../api'
import { commonStyles } from '../styles/common'

export default function ContainerCard({ navigation, ...props }) {
    const [src, setSrc] = useState(imagePlaceholder);

    const handlePress = () => {
        navigation.navigate('ContainerInfo', { uuid: props.uuid, marking: props.marking });
    };

    useEffect(() => {
        if (!props.image_url) {
            return
        }
        axiosImage.get(ReplaceIP(props.image_url), { responseType: 'arraybuffer' })
            .then((response) => {
                const base64 = `data:image/jpeg;base64,${Buffer.from(response.data, 'binary').toString('base64')}`;
                setSrc({ uri: base64 });
            })
            .catch(error => console.log('Error loading image:', error))
    }, []);

    return (
        <View padding='0' style={[styles.card, commonStyles.rounded, commonStyles.shadow]}>
            <View style={[styles.imageWrapper, commonStyles.rounded]}>
                <Image
                    style={styles.image}
                    source={src}
                    onError={() => setSrc(imagePlaceholder)}
                />
            </View>
            <View style={styles.container}>
                <Text style={[commonStyles.title, commonStyles.centerText]}>{props.marking}</Text>
                <Text style={[commonStyles.text, commonStyles.centerText]}>Тип: {props.type}</Text>
                <Text style={[commonStyles.text, commonStyles.centerText]}>Груз: {props.cargo}</Text>
                <Text style={[commonStyles.text, commonStyles.centerText]}>Вес: {props.weight} кг</Text>
            </View>
            {navigation && <TouchableOpacity
                style={[styles.button, commonStyles.rounded]}
                onPress={handlePress}
            >
                <Text style={{ color: 'white', fontSize: 16 }}>Подробнее</Text>
            </TouchableOpacity>}
        </View>
    );

}

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        paddingHorizontal: 0,
        paddingVertical: 0,
        overflow: 'hidden',
        gap: 10,
        // flexGrow: 1,
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
        aspectRatio: 16 / 9,
        margin: 0,
    },
    container: {
        display: 'flex',
        width: '100%',
        paddingHorizontal: 4,
        gap: 6,
    },
    button: {
        backgroundColor: '#520dc2',
        padding: 8,
        alignItems: 'center',
    },
})