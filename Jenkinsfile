pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'rohitgitte01/devops-portfolio:latest'
        KUBECONFIG = '/home/ubuntu/.kube/config'
        MINIKUBE_HOME = '/home/ubuntu/.minikube'
    }

    stages {

        stage('Debug') {
            steps {
                sh 'echo "Jenkins is running as user: $(whoami)"'
                sh 'ls -l ${KUBECONFIG}'
            }
        }

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Rohit001001/Rohit-devops-portfolio-source-code.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE} ."
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-hub-credentials') {
                        sh "docker push ${DOCKER_IMAGE}"
                    }
                }
            }
        }

        stage('Deploy to Minikube') {
            steps {
                sh "kubectl --kubeconfig=${KUBECONFIG} apply -f deploy.yml"
                sh "kubectl --kubeconfig=${KUBECONFIG} rollout restart deployment/devops-portfoilo-deployment"
            }
        }
    }

    post {
        always {
            echo 'Reached end of pipeline...'
        }
        success {
            echo 'Build, push, and deployment completed successfully.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}

