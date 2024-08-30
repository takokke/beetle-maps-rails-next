FROM ruby:3.1.2

# 画像を加工するために、コンテナにImageMagickとvipsをインストール
RUN apt-get update -qq && \
    apt-get install -y \
    vim \
    imagemagick \
    libvips-dev

RUN mkdir /myapp
WORKDIR /myapp
COPY Gemfile /myapp/Gemfile
COPY Gemfile.lock /myapp/Gemfile.lock

RUN gem update --system
RUN bundle update --bundler

RUN bundle install
COPY . /myapp

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]