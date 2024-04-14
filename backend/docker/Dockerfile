# pull official base image
FROM python:3.12

RUN apt-get update \
    && apt-get -y dist-upgrade \
    && apt-get -y install \
        curl \
        git \
        wget \
        libmagic1 \
        libpq-dev \
        poppler-utils \
    && apt-get -y autoremove \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# set work directory
WORKDIR /loan_portfolio/backend

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies

RUN pip install --upgrade pip
COPY ./backend/requirements.txt ./
RUN pip install -r requirements.txt

COPY ./backend/ .
