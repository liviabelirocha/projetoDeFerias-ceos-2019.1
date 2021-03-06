import React from 'react';
import {	StyleSheet, 
					Text, 
					View, 
					TextInput,  
					TouchableOpacity
				} from 'react-native';
import * as firebase from 'firebase';

export class Register extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			nome: '',
			password: '',
		};
	}

	register(email, nome, password) {
		firebase.auth().createUserWithEmailAndPassword(email, password).then( (res) => {
			firebase.database().ref('users/' + res.user.uid).set({
				nome: nome,
				email: email,
				password: password,
			});
			this.props.navigation.push('FirstLogin');
		}).catch( (error) =>{
			if (email == '' || password == '' || nome == '') {
				alert('Preencha todos os campos');
			} else if (error.code == 'auth/invalid-email') {
				alert('Email inválido');
			} else if (error.code == 'auth/weak-password') {
				alert('Senha fraca. Insira mais de 6 caracteres');
			} else if (error.code == 'auth/email-already-in-use') {
				alert('Email já em uso');
			}
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.logo}>Registro</Text>
				<TextInput style={styles.input}
					placeholder = "email"
					onChangeText={(email) => this.setState({email})} 
				/>
				<TextInput style={styles.input}
					placeholder = "nome"
					onChangeText={(nome) => this.setState({nome})} 
				/>
				<TextInput style={styles.input}
					placeholder = "senha"
					secureTextEntry={true}
					onChangeText={(password) => this.setState({password})} 
				/>
				<TouchableOpacity style={styles.button} onPress={() => this.register(this.state.email, this.state.nome, this.state.password)}>
					<Text style={styles.text}>Cadastre-se</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
					<Text style={styles.text}>Já possui uma conta?</Text>
				</TouchableOpacity>
			</View>
		);
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#363640',
		alignItems: 'center',
		justifyContent: 'center',
	},

	logo: {
		color: 'white',
		fontSize: 30,
		marginBottom: 70,
	},

	input: {
		backgroundColor: '#454650',
		paddingLeft: 12,
		paddingRight: 12,
		width: 280, 
		height: 56,
		margin: 1,
		color: 'white'
	},

	button: {
		backgroundColor: '#454650',
		paddingLeft: 12,
		paddingRight: 12,
		paddingTop: 16,
		width: 280,
		height: 56,
		alignItems: 'center',
		margin: 1,
	},

	text: {
		color: 'white',
		fontSize: 15,
	}
});
