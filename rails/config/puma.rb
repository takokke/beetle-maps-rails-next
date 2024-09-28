threads_count = ENV.fetch("RAILS_MAX_THREADS") { 5 }.to_i
# threads 最小スレッド数, 最大スレッド数
threads threads_count, threads_count

# Specifies the `environment` that Puma will run in.
environment ENV.fetch("RAILS_ENV") { "development" }

# Allow puma to be restarted by `rails restart` command.
plugin :tmp_restart

# 現在のフォルダの1個上の階層の絶対パス名を取得
# app_rootに代入
app_root = File.expand_path("..", __dir__)

# Unixソケットを用いて、pumaサーバーをバインドする
bind "unix://#{app_root}/tmp/sockets/puma.sock"