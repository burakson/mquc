def api_error(http_code=400, message='Method not allowed')
  status http_code
  {
    'error' => {
      'code'    => http_code,
      'message' => message
    }
  }.to_json()
end

def api_success(message='Request completed')
  {
    'response' => {
      'code'    => 200,
      'message' => message
    }
  }.to_json()
end

def get_request_payload
  payload = JSON.parse request.body.read
end
