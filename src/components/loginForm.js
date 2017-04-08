import React,{Component} from 'react';
import {Text} from 'react-native';
import {Button,Card,CardSection,Input,Spinner} from './common';
import firebase from 'firebase';
class LoginForm extends Component{
    state={email:'',password:'',error:'',loading:false}
    onButtonPress(){
        const {email,password}=this.state;
        this.setState({error:'',loading:true});
        firebase.auth().signInWithEmailAndPassword(email,password)
            .then(this.onLoginSuccess.bind(this))
            .catch(()=>{firebase.auth().createUserWithEmailAndPassword(email,password)
                .then(this.onLoginSuccess.bind(this))
                .catch(this.onLoginFailed.bind(this)
            );
        });
    };
    renderButton() {
        if (this.state.loading) {
            return <Spinner size="small"/>
        }
        return <Button onPress={this.onButtonPress.bind(this)}>Log in</Button>;
    }
    onLoginSuccess(){
        this.setState({
            email:'',
            password:'',
            loading:false,
            error:'Auth Successs'
        })
    }
    onLoginFailed(){
        console.log("got hes re")
        this.setState({error:'Authentication Failed',loading:false})
    }
    render(){
        return(
        <Card>
            <CardSection>
                <Input
                    placeholder="User@gmail.com"
                    label="Email"
                    value={this.state.text}
                    onChangeText={email=>this.setState({email})}
                />
            </CardSection>

            <CardSection>
                <Input
                    secureTextEntry
                    placeholder="Password"
                    label="Password"
                    value={this.state.password}
                    onChangeText={password=>this.setState({password})}
                />
            </CardSection>
            <Text style={styles.errorTextStyle}>
                {this.state.error}
            </Text>

            <CardSection>
                {this.renderButton()}
            </CardSection>

        </Card>
        )};
};
const styles={
    errorTextStyle:{
        fontSize:20,
        alignSelf:'center',
        color:'red'

    }
}
export default LoginForm;