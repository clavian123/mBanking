import { StyleSheet } from 'react-native'

export default(
    styles =  StyleSheet.create({
        container: {
            height: 80,
            flexBasis: "25%",
            alignItems: 'center',
            flexWrap: "wrap",
            justifyContent: 'center',
            marginHorizontal: 20
        },
        iconContainer: {
            height: "70%",
            alignItems: "center",
            justifyContent: "center"
        },
        icon: {
            width: 50,
            height: 50,
            borderRadius: 10
        }
    })
)