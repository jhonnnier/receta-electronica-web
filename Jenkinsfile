def PATH_ANGULAR_BUILDED = "dist/receta-electronica-web"
def BUCKET_NAME = "receta-electronica-dev-website"
def AWS_PROFILE = "ARG"

pipeline {
    agent { label 'fg-nodejs' }

    stages {
        stage('Dir and list 1') {
            steps {
                echo 'reading...'
                script {
                    sh 'pwd && ls -lsah'    
                }
            }
        }
        stage('Node Version') {
            steps {
                echo 'print node version...'
                script {
                    sh "node -v"
                }
            }
        }
        stage('Install dependencies nodejs') {
            steps {
                script {
                    sh 'sudo npm install > /dev/null'
                }
            }
        }
        stage('Install angular cli') {
            steps {
                script {
                    sh 'sudo npm install -g @angular/cli > /dev/null'
                }
            }
        }
        stage('Update angular') {
            steps {
                script {
                    sh 'ng update'
                }
            }
        }

        stage('Build Proyect') {
            steps {
                script {
                    sh 'ng build -c dev --aot --subresource-integrity'
                }
            }
        }
        // stage('SonarQube analysis') {
        //     when {
        //         anyOf {
        //             branch 'develop'
        //         }
        //     }
        //     steps {
        //         withSonarQubeEnv('conexia-sonar') {
        //             sh './mvnw sonar:sonar'
        //         }
        //     }   
        // }
        stage('Copy S3') {
            when {
                anyOf {
                    branch 'develop'
                }
            }
            steps {
                echo "Copying to S3..."
                script {
                    dir ("${PATH_ANGULAR_BUILDED}") {
                        sh 'pwd && ls -lsah' 
                        sh "aws s3 rm s3://${BUCKET_NAME} --profile ${AWS_PROFILE} --recursive"
                        sh "aws s3 cp . s3://${BUCKET_NAME} --profile ${AWS_PROFILE} --acl public-read --recursive"
                    }
                }
            }
        }
    }
}