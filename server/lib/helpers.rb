def api_error(http_code=400, message='Method not allowed')
  status http_code

  {
    'error' => {
      'code'    => http_code,
      'message' => message
    }
  }.to_json()
end

