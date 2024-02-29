require 'net/http'
require 'uri'
require 'json'
require 'dotenv'

Dotenv.load

# Warning: I'm not a Ruby developer, so don't be offended if this code sucks :)

# Example to identify a user from your backend
def identify_user
  email = "sally@mail.com"
  name = "Sally"
  picture = "https://example.com/sally.jpg"
  userid = "1234567890"

  group_id = "123456"
  group_name = "ACME Inc."

  uri = URI.parse("https://api.userstack.app/alpha2/identify")
  request = Net::HTTP::Post.new(uri)
  request.content_type = "application/json"
  request["Authorization"] = "Basic #{ENV['API_KEY']}"
  request.body = JSON.dump({
    "user" => { "email" => email, "name" => name, "picture" => picture, "userid" => userid },
    "config" => {
      "groupId" => group_id,
      "groupName" => group_name
    }
  })

  response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == "https") do |http|
    http.request(request)
  end

  if response.is_a?(Net::HTTPSuccess)
    puts "User identified successfully"
  else
    puts "Failed to identify user: #{response.body}"
  end
end

# Example to verify a user session from your backend
def verify_session
  session_id = "abcxyz"

  uri = URI.parse("https://api.userstack.app/alpha2/verify")
  request = Net::HTTP::Post.new(uri)
  request.content_type = "application/json"
  request["Authorization"] = "Basic #{ENV['API_KEY']}"
  request.body = JSON.dump({
    "sessionId" => session_id
  })

  response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == "https") do |http|
    http.request(request)
  end

  if response.is_a?(Net::HTTPSuccess)
    puts "Session verified successfully"
  else
    puts "Failed to verify session: #{response.body}"
  end
end

# Example to set a new group for an existing session from your backend
def set_new_group
  new_group_id = "654321"
  new_group_name = "NewCo"

  uri = URI.parse("https://api.userstack.app/alpha2/setgroup")
  request = Net::HTTP::Post.new(uri)
  request.content_type = "application/json"
  request["Authorization"] = "Basic #{ENV['API_KEY']}"
  request.body = JSON.dump({
    "groupId" => new_group_id,
    "groupName" => new_group_name
  })

  response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == "https") do |http|
    http.request(request)
  end

  if response.is_a?(Net::HTTPSuccess)
    puts "Group set successfully"
  else
    puts "Failed to set group: #{response.body}"
  end
end
