module ActionController
  class AbstractRequest
    def request_method
      @request_method ||= begin
        method = (parameters[:_method].blank? ? @env['REQUEST_METHOD'] : parameters[:_method].to_s).downcase
        if ACCEPTED_HTTP_METHODS.include?(method)
          method.to_sym
        else
          raise UnknownHttpMethod, "#{method}, accepted HTTP methods are #{ACCEPTED_HTTP_METHODS.to_a.to_sentence}"
        end
      end
    end
  end
end