<script>
import axios from "axios";
export default {
  data: () => {
    return {
      url: "",
      shortUrl: "",
    };
  },
  methods: {
    submit: async function (url) {
      try {
        const api = "http://localhost:5050/url";
        const response = await axios.post(api, {
          url,
        });
        this.shortUrl = response.data.shortUrl;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
