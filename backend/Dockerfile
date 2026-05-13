FROM python:3

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD [ "python", "app.py" ]

# from https://hub.docker.com/_/python/
# docker build -t blog .
# docker run -it --rm --name blog-instance blog
