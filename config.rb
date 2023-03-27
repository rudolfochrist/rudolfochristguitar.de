require 'date'
require "net/http"
require "icalendar"
require 'rrule'

$all_events = []


# Activate and configure extensions
# https://middlemanapp.com/advanced/configuration/#configuring-extensions

activate :directory_indexes
activate :i18n, mount_at_root: :false

# Layouts
# https://middlemanapp.com/basics/layouts/

# Per-page layout changes
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# With alternative layout
# page '/path/to/file.html', layout: 'other_layout'

# Proxy pages
# https://middlemanapp.com/advanced/dynamic-pages/

# proxy(
#   '/this-page-has-no-template.html',
#   '/template-file.html',
#   locals: {
#     which_fake_page: 'Rendering a fake page with a local variable'
#   },
# )

# Helpers
# Methods defined in the helpers block are available in templates
# https://middlemanapp.com/basics/helper-methods/

helpers do
  def year_range
    year_started = 2020
    current_year = Date.today.year
    return year_started if year_started == current_year
    return "#{year_started} - #{current_year}"
  end

  def active_nav(path)
    if path == "/" and current_page.url == "/"
      return "active"
    end
    return "active" if current_page.url.include? path
  end

  def date_string(date)
    I18n.l date, format: :long
  end

  def event_description(event)
    return [] if event.description.nil?
    c = event.description.force_encoding(Encoding::UTF_8)
    c.split("---").map(&:chomp)
  end

  def event_location(event)
    return "" if event.location.nil?
    event.location.force_encoding(Encoding::UTF_8)
  end

  def event_summary(event)
    return "" if event.summary.nil?
    event.summary.force_encoding(Encoding::UTF_8)
  end

  def event_url(event)
    u = URI(event.url.value_ical)
    if u.scheme.nil?
      u = URI.parse("https://#{event.url.value_ical}")
    end
    u
  end

  def events
    $all_events
      .sort_by(&:dtstart)
      .reverse
  end

  def event_canceled?(event)
    event_description(event).first == "c"
  end

  def event_private?(event)
    event_description(event).first == "p"
  end
end

# build-specific configuration
# https://middlemanapp.com/advanced/configuration/#environment-specific-settings

# configure :build do
#   activate :minify_css
#   activate :minify_javascript
# end
after_configuration do

  def event_description(event)
    return [] if event.description.nil?
    c = event.description.force_encoding(Encoding::UTF_8)
    c.split("---").map(&:chomp)
  end

  puts "Getting events"
  ics = Net::HTTP.get(URI(ENV["ICS_URI"]))
  ical = Icalendar::Calendar.parse(ics).first
  last_year = Date.today.year - 1
  next_year = Date.today.year + 1
  $all_events = ical.events.select {|event|
    event.dtstart.year >= last_year && event.dtstart.year < next_year && event_description(event).first != "i"
  }

  ical.events.select { |event| !event.rrule.empty? }.each do |event|
    rrule = RRule::Rule.new(event.rrule.first.value_ical)
    next_date = rrule.all(limit: 1)
    if !next_date.empty?
      event.dtstart = next_date.first.change(hour: 20, min: 30)
      # $all_events << event
    end
  end
end

after_build do
  files_to_cp = ["_redirects"]
  files_to_cp.each do |file|
    src = File.join config[:source], file
    dest = File.join config[:build_dir], file
    FileUtils.cp_r src, dest
  end
end

