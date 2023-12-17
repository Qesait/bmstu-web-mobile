import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useState, React } from 'react';
import { imageBaseURL } from '../api'

const placeholder = require(`../assets/placeholder.jpg`)

export default function ContainerCard({ navigation, ...props }) {
    const [src, setSrc] = useState({ uri: `${imageBaseURL}/${props.uuid}.jpg` });

    const handlePress = () => {
        navigation.navigate('ContainerInfo', { uuid: props.uuid, marking: props.marking });
    };

    return (
        <View padding='0' style={[styles.card, styles.shadow, styles.border]}>
            <View style={[styles.imageWrapper, styles.border]}>
                <Image
                    style={styles.image}
                    source={src}
                    // defaultSource={placeholder} // ignored in dev build
                    onError={() => setSrc(placeholder)}
                />
            </View>
            <View style={styles.container}>
                <Text style={styles.title}>{props.marking}</Text>
                <Text style={styles.text}>Тип: {props.type}</Text>
                {!!props.length && <Text style={styles.text}>Длина: {props.length}</Text>}
                {!!props.height && <Text style={styles.text}>Высота: {props.height}</Text>}
                {!!props.width && <Text style={styles.text}>Ширина: {props.width}</Text>}
                <Text style={styles.text}>Груз: {props.cargo}</Text>
                <Text style={styles.text}>Вес: {props.weight} кг</Text>
            </View>
            {/* <Button title='View details' onPress={handlePress} color='#460ba5' style={styles.border} /> */}
            {navigation && <TouchableOpacity
                style={[styles.button, styles.border]}
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
        margin: 10,
        // flexGrow: 1,
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
        aspectRatio: 16 / 9,
        margin: 0,
    },
    container: {
        display: 'flex',
        width: '100%',
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
    button: {
        backgroundColor: '#520dc2',
        padding: 8,
        alignItems: 'center',
    },
});