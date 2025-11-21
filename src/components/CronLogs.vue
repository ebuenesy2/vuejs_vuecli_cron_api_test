<template>
  <div class="cron-monitor">
    <h2>API Cron Monitor</h2>

    <div class="controls">
      <button @click="manualRun" :disabled="loadingRun">
        {{ loadingRun ? "Çalıştırılıyor..." : "Manuel Test" }}
      </button>
      <span v-if="lastUpdate">Son güncelleme: {{ lastUpdate }}</span>
    </div>

    <div class="tables">
      <!-- Success List -->
      <div class="table-card">
        <h3>Success List</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Zaman</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in success.data" :key="'s-'+item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.timestamp }}</td>
              <td><pre>{{ pretty(item.data) }}</pre></td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Error List -->
      <div class="table-card">
        <h3>Error List</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Zaman</th>
              <th>Hata / Data</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in error.data" :key="'e-'+item.id">
              <td>{{ item.id }}</td>
              <td>{{ formatTime(item.timestamp) }}</td>
              <td><pre>{{ pretty(item.data) }}</pre></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, onUnmounted } from "vue";
import { runNow, getSuccess, getError } from "@/services/api";
import dayjs from 'dayjs';

export default {
  name: "CronMonitor",
  setup() {
    const loadingRun = ref(false);
    const lastUpdate = ref("");

    const success = reactive({
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
      data: [],
    });

    const error = reactive({
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
      data: [],
    });

    let intervalId = null;

    const fetchSuccess = async () => {
      try {
        const res = await getSuccess(success.page, success.limit);
        Object.assign(success, res);
      } catch (err) {
        console.error("Success fetch error:", err);
      }
    };

    const fetchError = async () => {
      try {
        const res = await getError(error.page, error.limit);
        Object.assign(error, res);
      } catch (err) {
        console.error("Error fetch error:", err);
      }
    };

    const fetchAll = async () => {
      await Promise.all([fetchSuccess(), fetchError()]);
      lastUpdate.value = new Date().toLocaleTimeString();
    };

    const manualRun = async () => {
      loadingRun.value = true;
      try {
        await runNow();
        await fetchAll();
      } catch (err) {
        console.error("Manual run error:", err);
      } finally {
        loadingRun.value = false;
      }
    };

    onMounted(() => {
      fetchAll();
      intervalId = setInterval(fetchAll, 60000); // 1 dakikada bir yenile
    });

    onUnmounted(() => {
      if (intervalId) clearInterval(intervalId);
    });

    const pretty = (obj) => {
      try {
        return JSON.stringify(obj, null, 2);
      } catch {
        return String(obj);
      }
    };

    return {
      success,
      error,
      loadingRun,
      lastUpdate,
      manualRun,
      pretty,
    };
  },
  methods: {
    formatTime(ts) {
      return dayjs(ts).format('DD.MM.YYYY HH:mm:ss');
    }
  }
};
</script>

<style scoped>
.cron-monitor {
  max-width: 1000px;
  margin: 20px auto;
  padding: 10px;
}

.controls {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}

button {
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #bbb;
  background: white;
  cursor: pointer;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.tables {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.table-card {
  flex: 1 1 48%;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 10px;
  background: #fafafa;
  max-height: 400px;
  overflow-y: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

th, td {
  padding: 6px 8px;
  border-bottom: 1px solid #eee;
  text-align: left;
}

pre {
  font-size: 12px;
  white-space: pre-wrap;
  word-break: break-word;
  margin: 0;
}
</style>
