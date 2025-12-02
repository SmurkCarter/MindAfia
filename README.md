MindAfia is a full-stack telepsychiatry system designed to modernize mental healthcare delivery through secure online consultations, intelligent assessments, and real-time clinician–patient communication.
Built with Django, Express/Node.js, WebRTC, and an optional ML microservice, MindAfia integrates scheduling, clinical notes, video chat, and predictive analytics into a single seamless platform.

🌟 Key Features

🔐 Secure Authentication & Role Management

JWT-based login/signup for patients and clinicians

Role-based access control (RBAC)


🧑‍⚕️ Patient & Clinician Management


Profile management

Demographics, medical history, and clinician specialization

Secure data storage following healthcare best-practice


📅 Appointment Scheduling


Real-time scheduling

Appointment reminders

Availability management for clinicians

💬 Telepsychiatry Chat & Video Sessions

WebRTC video calls

Socket.IO real-time messaging

Encrypted communication channels

📝 Clinical Notes

SOAP notes

Editable session notes

Secure clinician-only access

🤖 Machine Learning Module

Risk scoring (e.g., suicide/self-harm probability)

Sentiment analysis on chat/text

Early warning anomaly detection

Modular pipeline for custom ML models (NLP, audio, etc.)

📊 Analytics Dashboard

Patient progress visualization

Session history

ML-generated insights and trends

🏗️ Tech Stack

Backend

Django / Django REST Framework

Channels (ASGI) for WebSockets

PostgreSQL

Redis (optional for real-time updates)

Frontend

HTML, CSS, JavaScript

WebRTC for video

Reusable UI components

Real-Time Signaling

Node.js + Express

Socket.IO

Machine Learning (optional microservice)

Python (FastAPI/Flask)

Scikit-learn / TensorFlow

NLP preprocessing pipelines

DevOps

Docker & Docker Compose

NGINX

CI/CD ready

🎯 Project Goal

MindAfia aims to provide accessible, affordable, and intelligent mental health support by combining telemedicine, AI-assisted insights, and secure digital communication — especially for regions with limited access to mental health professionals.
💡 Status

🚧 Under active development — contributions welcome!
