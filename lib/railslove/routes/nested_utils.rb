module  Railslove
  module Routes
    module NestedUtils
      def self.included(base)
        base.before_filter :get_request_uri
      end
      
      private
      def find_nested_types_and_ids(ignore=verbs_to_ignore)
        sections = []
        if defined?(DEFAULT_HOST) && defined?(Domain) && request.host != DEFAULT_HOST
          domain = Domain.find_by_url(request.host)
          sections.push [domain.domainable_type.pluralize.downcase,domain.domainable.to_param] unless domain.blank?  
        end
        sections += @request_uri.scan(%r{/(\w+)/([^\/;]*)})
        sections.map! do |controller_name, id|
          next if ignore.include?(id)
          [controller_name.singularize.camelize, id]
        end
        sections.delete_if do |x| x.nil? end
      end
      
      # counts backwards
      def find_polymorphic_type_and_id(level=1)
        find_nested_types_and_ids[-level]
      end
      
      def polymorphic_object(level=1)
        type, id = find_polymorphic_type_and_id(level)
        return nil if type.blank? or id.blank?
        return instance_variable_get("@#{type.underscore}".to_sym) if instance_variables.include?("@#{type.underscore}")
        instance_variable_set("@#{type.underscore}".to_sym, type.constantize.find_by_param!(id))
      end
      
      def polymorphic_object!(level=1)
        obj = polymorphic_object(level)
        unless obj then raise ActiveRecord::RecordNotFound end
        obj
      end

      def polymorphic_object=(obj)
         self.instance_variable_set("@#{obj.class.name.underscore}".to_sym, obj)
       end
      
      def polymorphic_object_url(level=1)
        types_and_ids = find_nested_types_and_ids()
        nested_types = Array.new
        nested_objects = Array.new
        types_and_ids.each do |type,id|
          nested_types << "#{type.underscore}"
          nested_objects << (instance_variable_get("@#{type.underscore}".to_sym) || type.constantize.find_by_param(id))
        end
        method_name = nested_types[0..-level].join("_")
        return "/" if method_name.blank?
        send("#{method_name.downcase}_url".to_sym, *nested_objects[0..-level] )
      end
      
      def init_polymorphic_variables(level=3)
        types_and_ids=find_nested_types_and_ids
        types_and_ids.to(level).each do |type,id|
          self.instance_variable_set("@#{type.underscore}".to_sym, type.constantize.find_by_param(id))
        end
      end

      # get /users/susi/galleries if you have /users/susi/galleries/3
      def endmost_index_url(args={})
        types_and_ids = find_nested_types_and_ids
        types_and_ids.map! do |controller_name, id|
          [controller_name.pluralize.downcase, id]
        end
        if "/#{types_and_ids.join("/").downcase}" == @request_uri.downcase
          endmost = types_and_ids.delete(types_and_ids.last)
          url = "/#{types_and_ids.join("/")}/#{endmost.first}".downcase
        else
          url = @request_uri.gsub(/\/#{verbs_to_ignore.join("|")}$/,"")
        end
        append = (args.delete(:append) || "")
        url << "/" unless url.ends_with?("/") and append.blank?
        append << "?" unless args.blank?
        append << args.to_query unless args.blank?
        "#{url}#{append}"
      end
      
      def current_url(args={})
        return @current_url if @current_url
        url = normalized_request_uri
        append = (args.delete(:append) || "")
        url << "/" unless url.ends_with?("/") and append.blank?
        append << "?" unless args.blank?
        append << args.to_query unless args.blank?
        "#{url}#{append}"
      end
      
      def scoped_url_for(obj)
        types_and_ids = find_nested_types_and_ids
        types_and_ids << [obj.class.name,obj.to_param]
        types_and_ids.map! do |controller_name, id|
          [controller_name.pluralize.downcase, id]
        end
        "/#{types_and_ids.join("/").downcase}"
      end
      
      def verbs_to_ignore 
        %w{new edit}
      end
      
      def normalized_request_uri(request_uri=nil)
        (request_uri || request.env['REQUEST_URI']).gsub(/\?.*/,"")
      end
      
      def get_request_uri
        @request_uri = normalized_request_uri
        @request_uri.gsub!(/\/$/,"")
        true
      end
    end    
  end
end