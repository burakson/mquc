get '/' do
  haml :index, :locals => {:site_title => settings.site_title}
end

get '/api/status/?' do
  message = {'status' => 'ok'}
  message.to_json
end

not_found do
  is_api_request = request.path_info.start_with?('/api/')

  api_error(405) if is_api_request
end
