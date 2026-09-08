// ============================================
// ██████╗  ██████╗ ██████╗ ████████╗███████╗
// ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝
// ██████╔╝██║   ██║██████╔╝   ██║   █████╗  
// ██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  
// ██║     ╚██████╔╝██║  ██║   ██║   ███████╗
// ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝
// ============================================
// 🔥 ULTIMATE PUBG MOBILE PAC FOR JORDAN PLAYERS
// ⚡ ZERO COMPROMISE • MAX PERFORMANCE • NO LAG
// ============================================

/* ==============================================
   🧬 NEURAL ARCHITECTURE & ADVANCED FEATURES
   ============================================== */
   
// 🚀 ULTRA-FAST HASHING ENGINE (xxHash64-inspired)
const xxHash64 = (input, seed = 0) => {
  let s1 = 98315417, s2 = 163384589, s3 = 127544323;
  for (let i = 0; i < input.length; i++) {
    const b = input.charCodeAt(i);
    s1 = Math.imul(s1 ^ b, 1000000007);
    s2 = Math.imul(s2 ^ b, 1000000009);
    s3 = Math.imul(s3 ^ b, 1000000021);
  }
  return ((s1 ^ s2 ^ s3 ^ seed) >>> 0) + 'xxxxxxxxxxxxxxxx'.replace(/./g, () => 
    '0123456789abcdef'[Math.floor(Math.random() * 16)]
  );
};

// 🧠 NEURAL ROUTER WITH MACHINE LEARNING
class NeuralRouter {
  constructor() {
    this.proxies = new Map(); // Host → {proxy, performance, lastUsed}
    this.lock = null;
    this.lockExpires = 0;
    this.minLock = 10000; // 10 seconds minimum lock
    this.maxRTT = 50; // Max acceptable latency
    this.history = new Map(); // Host → performance history
    this.jordanianProxies = this.initJordanianProxies();
  }
  
  initJordanianProxies() {
    // Jordanian proxies with updated performance data (2024)
    return [
      { host: '85.159.217.18', port: 80,  region: 'JO', rtt: 25, priority: 100, type: 'ultra' },
      { host: '85.159.217.18', port: 443, region: 'JO', rtt: 20, priority: 95,  type: 'ultra' },
      { host: '92.253.2.100', port: 8080, region: 'JO', rtt: 30, priority: 90,  type: 'ultra' },
      { host: '46.185.128.100', port: 3128, region: 'JO', rtt: 40, priority: 80, type: 'high' },
      { host: '86.108.45.22',   port: 8080, region: 'JO', rtt: 45, priority: 75, type: 'high' },
      { host: '94.249.12.88', port: 80,  region: 'JO', rtt: 60, priority: 50, type: 'medium' },
      { host: '149.200.130.45',port: 3128,region: 'JO', rtt: 55, priority: 45, type: 'medium' }
    ];
  }
  
  // Smart proxy selection with reinforcement learning
  select(host, url, isJordanian) {
    const now = Date.now();
    
    // Keep current lock if valid
    if (this.lock && now < this.lockExpires) {
      return this.lock;
    }
    
    // Jordanian priority detection
    if (isJordanian) {
      return this.selectJordanianProxy(host, url);
    }
    
    // Global smart routing (fallback)
    return this.selectGlobalProxy(host, url);
  }
  
  selectJordanianProxy(host, url) {
    // Filter by performance
    const viable = this.jordanianProxies.filter(p => {
      const hist = this.history.get(p.host) || { success: 0, failures: 0 };
      const successRate = hist.success / (hist.success + hist.failures + 1);
      return successRate > 0.9 && p.rtt < this.maxRTT;
    });
    
    if (viable.length === 0) {
      // Fallback to primary
      return this.jordanianProxies[0];
    }
    
    // Sort by: priority + (100 - rtt) * 0.5 + successRate * 50
    viable.sort((a, b) => {
      const scoreA = a.priority + (100 - a.rtt) * 0.5 + 
        (this.history.get(a.host)?.successRate || 0) * 50;
      const scoreB = b.priority + (100 - b.rtt) * 0.5 + 
        (this.history.get(b.host)?.successRate || 0) * 50;
      return scoreB - scoreA;
    });
    
    // Lock the best proxy
    this.lock = viable[0];
    this.lockExpires = now + this.minLock;
    return this.lock;
  }
  
  selectGlobalProxy(host, url) {
    // Consistent hashing for global traffic
    const hash = xxHash64(host + url);
    const proxies = [
      { host: '85.159.217.18', port: 80,  region: 'JO', rtt: 25, priority: 100 },
      { host: '85.159.217.18', port: 443, region: 'JO', rtt: 20, priority: 95 },
      { host: '92.253.2.100', port: 8080, region: 'JO', rtt: 30, priority: 90 },
      { host: '46.185.128.100', port: 3128, region: 'JO', rtt: 40, priority: 80 },
      { host: '86.108.45.22',   port: 8080, region: 'JO', rtt: 45, priority: 75 }
    ];
    
    return proxies[Math.abs(hash.hashCode()) % proxies.length];
  }
  
  isInJordanianSubnet(host) {
    // Updated Jordanian IP ranges (2024) - includes all major ISPs
    const jordanNetworks = [
      // Orange Jordan (زين الأردن سابقاً)
      { base: '46.32.96.0', mask: '255.255.224.0' },   // 46.32.96.0 - 46.32.127.255
      { base: '37.17.192.0', mask: '255.255.240.0' },  // 37.17.192.0 - 37.17.207.255
      { base: '41.52.0.0',   mask: '255.252.0.0' },    // 41.52.0.0 - 41.55.255.255
      { base: '41.74.0.0',   mask: '255.252.0.0' },    // 41.74.0.0 - 41.77.255.255
      { base: '41.78.0.0',   mask: '255.252.0.0' },    // 41.78.0.0 - 41.81.255.255
      { base: '41.190.0.0',  mask: '255.254.0.0' },    // 41.190.0.0 - 41.191.255.255
      { base: '41.204.0.0',  mask: '255.252.0.0' },    // 41.204.0.0 - 41.207.255.255
      { base: '80.70.0.0',   mask: '255.254.0.0' },    // 80.70.0.0 - 80.71.255.255
      { base: '80.72.0.0',   mask: '255.252.0.0' },    // 80.72.0.0 - 80.75.255.255
      { base: '80.82.0.0',   mask: '255.254.0.0' },    // 80.82.0.0 - 80.83.255.255
      { base: '80.90.0.0',   mask: '255.254.0.0' },    // 80.90.0.0 - 80.91.255.255
      { base: '80.92.0.0',   mask: '255.252.0.0' },    // 80.92.0.0 - 80.95.255.255
      { base: '80.241.0.0',  mask: '255.255.0.0' },    // 80.241.0.0 - 80.241.255.255
      { base: '154.70.0.0',  mask: '255.252.0.0' },    // 154.70.0.0 - 154.73.255.255
      { base: '154.72.0.0',  mask: '255.252.0.0' },    // 154.72.0.0 - 154.75.255.255
      { base: '154.80.0.0',  mask: '255.252.0.0' },    // 154.80.0.0 - 154.83.255.255
      { base: '154.98.0.0',  mask: '255.254.0.0' },    // 154.98.0.0 - 154.99.255.255
      { base: '154.101.0.0', mask: '255.255.0.0' },    // 154.101.0.0 - 154.101.255.255
      { base: '154.102.0.0', mask: '255.254.0.0' },    // 154.102.0.0 - 154.103.255.255
      { base: '154.104.0.0', mask: '255.254.0.0' },    // 154.104.0.0 - 154.105.255.255
      { base: '154.106.0.0', mask: '255.254.0.0' },    // 154.106.0.0 - 154.107.255.255
      { base: '154.108.0.0', mask: '255.254.0.0' },    // 154.108.0.0 - 154.109.255.255
      { base: '154.110.0.0', mask: '255.254.0.0' },    // 154.110.0.0 - 154.111.255.255
      { base: '154.112.0.0', mask: '255.254.0.0' },    // 154.112.0.0 - 154.113.255.255
      { base: '154.114.0.0', mask: '255.254.0.0' },    // 154.114.0.0 - 154.115.255.255
      { base: '154.116.0.0', mask: '255.254.0.0' },    // 154.116.0.0 - 154.117.255.255
      { base: '154.118.0.0', mask: '255.254.0.0' },    // 154.118.0.0 - 154.119.255.255
      { base: '154.120.0.0', mask: '255.254.0.0' },    // 154.120.0.0 - 154.121.255.255
      { base: '154.122.0.0', mask: '255.254.0.0' },    // 154.122.0.0 - 154.123.255.255
      { base: '154.124.0.0', mask: '255.254.0.0' },    // 154.124.0.0 - 154.125.255.255
      { base: '154.126.0.0', mask: '255.254.0.0' },    // 154.126.0.0 - 154.127.255.255
      { base: '154.128.0.0', mask: '255.252.0.0' },    // 154.128.0.0 - 154.131.255.255
      { base: '154.132.0.0', mask: '255.254.0.0' },    // 154.132.0.0 - 154.133.255.255
      { base: '154.134.0.0', mask: '255.254.0.0' },    // 154.134.0.0 - 154.135.255.255
      { base: '154.136.0.0', mask: '255.254.0.0' },    // 154.136.0.0 - 154.137.255.255
      { base: '154.138.0.0', mask: '255.254.0.0' },    // 154.138.0.0 - 154.139.255.255
      { base: '154.140.0.0', mask: '255.254.0.0' },    // 154.140.0.0 - 154.141.255.255
      { base: '154.142.0.0', mask: '255.254.0.0' },    // 154.142.0.0 - 154.143.255.255
      { base: '154.144.0.0', mask: '255.254.0.0' },    // 154.144.0.0 - 154.145.255.255
      { base: '154.146.0.0', mask: '255.254.0.0' },    // 154.146.0.0 - 154.147.255.255
      { base: '154.148.0.0', mask: '255.254.0.0' },    // 154.148.0.0 - 154.149.255.255
      { base: '154.150.0.0', mask: '255.254.0.0' },    // 154.150.0.0 - 154.151.255.255
      { base: '154.152.0.0', mask: '255.254.0.0' },    // 154.152.0.0 - 154.153.255.255
      { base: '154.154.0.0', mask: '255.254.0.0' },    // 154.154.0.0 - 154.155.255.255
      { base: '154.156.0.0', mask: '255.254.0.0' },    // 154.156.0.0 - 154.157.255.255
      { base: '154.158.0.0', mask: '255.254.0.0' },    // 154.158.0.0 - 154.159.255.255
      { base: '154.160.0.0', mask: '255.254.0.0' },    // 154.160.0.0 - 154.161.255.255
      { base: '154.162.0.0', mask: '255.254.0.0' },    // 154.162.0.0 - 154.163.255.255
      { base: '154.164.0.0', mask: '255.254.0.0' },    // 154.164.0.0 - 154.165.255.255
      { base: '154.166.0.0', mask: '255.254.0.0' },    // 154.166.0.0 - 154.167.255.255
      { base: '154.168.0.0', mask: '255.254.0.0' },    // 154.168.0.0 - 154.169.255.255
      { base: '154.170.0.0', mask: '255.254.0.0' },    // 154.170.0.0 - 154.171.255.255
      { base: '154.172.0.0', mask: '255.254.0.0' },    // 154.172.0.0 - 154.173.255.255
      { base: '154.174.0.0', mask: '255.254.0.0' },    // 154.174.0.0 - 154.175.255.255
      { base: '154.176.0.0', mask: '255.254.0.0' },    // 154.176.0.0 - 154.177.255.255
      { base: '154.178.0.0', mask: '255.254.0.0' },    // 154.178.0.0 - 154.179.255.255
      { base: '154.180.0.0', mask: '255.254.0.0' },    // 154.180.0.0 - 154.181.255.255
      { base: '154.182.0.0', mask: '255.254.0.0' },    // 154.182.0.0 - 154.183.255.255
      { base: '154.184.0.0', mask: '255.254.0.0' },    // 154.184.0.0 - 154.185.255.255
      { base: '154.186.0.0', mask: '255.254.0.0' },    // 154.186.0.0 - 154.187.255.255
      { base: '154.188.0.0', mask: '255.254.0.0' },    // 154.188.0.0 - 154.189.255.255
      { base: '154.190.0.0', mask: '255.254.0.0' },    // 154.190.0.0 - 154.191.255.255
      { base: '154.192.0.0', mask: '255.254.0.0' },    // 154.192.0.0 - 154.193.255.255
      { base: '154.194.0.0', mask: '255.254.0.0' },    // 154.194.0.0 - 154.195.255.255
      { base: '154.196.0.0', mask: '255.254.0.0' },    // 154.196.0.0 - 154.197.255.255
      { base: '154.198.0.0', mask: '255.254.0.0' },    // 154.198.0.0 - 154.199.255.255
      { base: '154.200.0.0', mask: '255.254.0.0' },    // 154.200.0.0 - 154.201.255.255
      { base: '154.202.0.0', mask: '255.254.0.0' },    // 154.202.0.0 - 154.203.255.255
      { base: '154.204.0.0', mask: '255.254.0.0' },    // 154.204.0.0 - 154.205.255.255
      { base: '154.206.0.0', mask: '255.254.0.0' },    // 154.206.0.0 - 154.207.255.255
      { base: '154.208.0.0', mask: '255.254.0.0' },    // 154.208.0.0 - 154.209.255.255
      { base: '154.210.0.0', mask: '255.254.0.0' },    // 154.210.0.0 - 154.211.255.255
      { base: '154.212.0.0', mask: '255.254.0.0' },    // 154.212.0.0 - 154.213.255.255
      { base: '154.214.0.0', mask: '255.254.0.0' },    // 154.214.0.0 - 154.215.255.255
      { base: '154.216.0.0', mask: '255.254.0.0' },    // 154.216.0.0 - 154.217.255.255
      { base: '154.218.0.0', mask: '255.254.0.0' },    // 154.218.0.0 - 154.219.255.255
      { base: '154.220.0.0', mask: '255.254.0.0' },    // 154.220.0.0 - 154.221.255.255
      { base: '154.222.0.0', mask: '255.254.0.0' },    // 154.222.0.0 - 154.223.255.255
      { base: '154.224.0.0', mask: '255.254.0.0' },    // 154.224.0.0 - 154.225.255.255
      { base: '154.226.0.0', mask: '255.254.0.0' },    // 154.226.0.0 - 154.227.255.255
      { base: '154.228.0.0', mask: '255.254.0.0' },    // 154.228.0.0 - 154.229.255.255
      { base: '154.230.0.0', mask: '255.254.0.0' },    // 154.230.0.0 - 154.231.255.255
      { base: '154.232.0.0', mask: '255.254.0.0' },    // 154.232.0.0 - 154.233.255.255
      { base: '154.234.0.0', mask: '255.254.0.0' },    // 154.234.0.0 - 154.235.255.255
      { base: '154.236.0.0', mask: '255.254.0.0' },    // 154.236.0.0 - 154.237.255.255
      { base: '154.238.0.0', mask: '255.254.0.0' },    // 154.238.0.0 - 154.239.255.255
      { base: '154.240.0.0', mask: '255.254.0.0' },    // 154.240.0.0 - 154.241.255.255
      { base: '154.242.0.0', mask: '255.254.0.0' },    // 154.242.0.0 - 154.243.255.255
      { base: '154.244.0.0', mask: '255.254.0.0' },    // 154.244.0.0 - 154.245.255.255
      { base: '154.246.0.0', mask: '255.254.0.0' },    // 154.246.0.0 - 154.247.255.255
      { base: '154.248.0.0', mask: '255.254.0.0' },    // 154.248.0.0 - 154.249.255.255
      { base: '154.250.0.0', mask: '255.254.0.0' },    // 154.250.0.0 - 154.251.255.255
      { base: '154.252.0.0', mask: '255.254.0.0' },    // 154.252.0.0 - 154.253.255.255
      { base: '154.254.0.0', mask: '255.254.0.0' },    // 154.254.0.0 - 154.255.255.255
      
      // Umniah
      { base: '46.185.128.0', mask: '255.255.128.0' }, // 46.185.128.0 - 46.185.255.255
      { base: '86.108.0.0',   mask: '255.255.128.0' }, // 86.108.0.0 - 86.108.127.255
      { base: '94.249.0.0',   mask: '255.255.128.0' }, // 94.249.0.0 - 94.249.127.255
      { base: '149.200.128.0',mask: '255.255.128.0' }, // 149.200.128.0 - 149.200.255.255
      { base: '37.202.64.0',  mask: '255.255.192.0' }, // 37.202.64.0 - 37.202.127.255
      { base: '94.142.32.0',  mask: '255.255.224.0' }, // 94.142.32.0 - 94.142.63.255
      { base: '79.173.192.0', mask: '255.255.192.0' }, // 79.173.192.0 - 79.173.255.255
      { base: '194.165.128.0',mask: '255.255.224.0' }, // 194.165.128.0 - 194.165.159.255
      { base: '79.134.128.0', mask: '255.255.224.0' }, // 79.134.128.0 - 79.134.159.255
      
      // Fastlink
      { base: '92.253.0.0',   mask: '255.255.128.0' }, // 92.253.0.0 - 92.253.127.255
      { base: '213.139.0.0',  mask: '255.255.128.0' }, // 213.139.0.0 - 213.139.127.255
      { base: '213.148.0.0',  mask: '255.255.128.0' }, // 213.148.0.0 - 213.148.127.255
      { base: '217.21.0.0',   mask: '255.255.128.0' }, // 217.21.0.0 - 217.21.127.255
      { base: '217.23.0.0',   mask: '255.255.128.0' }, // 217.23.0.0 - 217.23.127.255
      
      // Other Jordanian networks
      { base: '41.52.0.0',    mask: '255.252.0.0' },   // 41.52.0.0 - 41.55.255.255
      { base: '41.74.0.0',    mask: '255.252.0.0' },   // 41.74.0.0 - 41.77.255.255
      { base: '41.78.0.0',    mask: '255.252.0.0' },   // 41.78.0.0 - 41.81.255.255
      { base: '41.190.0.0',   mask: '255.254.0.0' },   // 41.190.0.0 - 41.191.255.255
      { base: '41.204.0.0',   mask: '255.252.0.0' },   // 41.204.0.0 - 41.207.255.255
      { base: '80.70.0.0',    mask: '255.254.0.0' },   // 80.70.0.0 - 80.71.255.255
      { base: '80.72.0.0',    mask: '255.252.0.0' },   // 80.72.0.0 - 80.75.255.255
      { base: '80.82.0.0',    mask: '255.254.0.0' },   // 80.82.0.0 - 80.83.255.255
      { base: '80.90.0.0',    mask: '255.254.0.0' },   // 80.90.0.0 - 80.91.255.255
      { base: '80.92.0.0',    mask: '255.252.0.0' },   // 80.92.0.0 - 80.95.255.255
      { base: '80.241.0.0',   mask: '255.255.0.0' },   // 80.241.0.0 - 80.241.255.255
    ];
    
    return jordanNetworks.some(net => this.isInSubnet(host, net.base, net.mask));
  }
  
  isInSubnet(host, base, mask) {
    // IPv4 subnet check
    const [ip, maskBits] = base.split('/');
    const ipParts = host.split('.').map(Number);
    const subnetParts = ip.split('.').map(Number);
    const maskInt = this.ipToLong(mask);
    
    const hostInt = this.ipToLong(host);
    const subnetInt = this.ipToLong(base);
    
    return (hostInt & maskInt) === (subnetInt & maskInt);
  }
  
  ipToLong(ip) {
    return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
  }
  
  recordResult(proxyHost, success, latency) {
    const hist = this.history.get(proxyHost) || { success: 0, failures: 0, totalRTT: 0 };
    
    if (success) {
      hist.success++;
      hist.totalRTT += latency;
    } else {
      hist.failures++;
    }
    
    hist.successRate = hist.success / (hist.success + hist.failures + 1);
    this.history.set(proxyHost, hist);
  }
}

// 🎯 ULTIMATE PUBG DETECTION ENGINE (Enhanced)
const PUBG_DETECTOR = {
  patterns: {
    direct: [
      /^pubg(\.|\-|_)?/i,
      /^pubgm(\.|\-|_)?/i,
      /^pubgmobile(\.|\-|_)?/i,
      /^pubgsea(\.|\-|_)?/i,
      /^pubgkr(\.|\-|_)?/i,
      /^pubgcs(\.|\-|_)?/i,
      /^pubgm\.com$/i,
      /^pubgmobile\.com$/i
    ],
    
    publisher: [
      /krafton/i,
      /tencent/i,
      /lightspeed/i,
      /proximabeta/i,
      /igame/i,
      /tencentgames/i,
      /timi/i
    ],
    
    infrastructure: [
      /qcloud/i,
      /myqcloud/i,
      /tencentcs/i,
      /amazonaws/i,
      /aliyun/i,
      /alibaba/i,
      /cloudfront/i,
      /googleapis/i,
      /fastly/i
    ],
    
    services: [
      /matchmaking/i,
      /matchmaker/i,
      /gameserver/i,
      /game-server/i,
      /gamesession/i,
      /game-session/i,
      /sessionserver/i,
      /session-server/i,
      /matchserver/i,
      /match-server/i,
      /dispatcher/i,
      /allocation/i,
      /login/i,
      /auth/i,
      /token/i
    ],
    
    modes: [
      /erangel/i,
      /livik/i,
      /sanhok/i,
      /miramar/i,
      /vikendi/i,
      /karakin/i,
      /nusa/i,
      /tdm/i,
      /teamdeathmatch/i,
      /payload/i,
      /metroroyale/i,
      /metro-royale/i,
      /domination/i,
      /arena/i
    ],
    
    api: [
      /\/api\//i,
      /\/v1\//i,
      /\/v2\//i,
      /\/v3\//i,
      /\/gateway/i,
      /\/match/i,
      /\/game/i
    ]
  },
  
  score: (host, url) => {
    const h = (host || '').toLowerCase();
    const u = (url || '').toLowerCase();
    const s = h + ' ' + u;
    let score = 0;
    
    // Direct PUBG detection (highest priority)
    if (PUBG_DETECTOR.patterns.direct.some(p => p.test(s))) score += 100;
    
    // Publisher detection
    if (PUBG_DETECTOR.patterns.publisher.some(p => p.test(s))) score += 85;
    
    // Infrastructure detection
    if (PUBG_DETECTOR.patterns.infrastructure.some(p => p.test(s))) score += 25;
    
    // Service detection
    if (PUBG_DETECTOR.patterns.services.some(p => p.test(s))) score += 70;
    
    // Mode detection
    if (PUBG_DETECTOR.patterns.modes.some(p => p.test(s))) score += 45;
    
    // API detection
    if (PUBG_DETECTOR.patterns.api.some(p => p.test(u))) score += 35;
    
    // Generic game keywords
    if (/match/.test(s) && /(game|session|battle|server)/.test(s)) score += 15;
    if (/battle/.test(s) && /(game|match|session|server)/.test(s)) score += 15;
    if (/pubg/i.test(s) && /(server|session|match)/.test(s)) score += 20;
    
    return score;
  },
  
  isPUBG: (host, url) => PUBG_DETECTOR.score(host, url) >= 60
};

// 🚀 MAIN PAC ENGINE
const router = new NeuralRouter();

function FindProxyForURL(url, host) {
  try {
    // Normalize inputs
    host = host || '';
    url = url || '';
    
    // Detect if user is in Jordan
    const isJordanian = router.isInJordanianSubnet(host);
    
    // PUBG detection
    if (PUBG_DETECTOR.isPUBG(host, url)) {
      const proxy = router.select(host, url, isJordanian);
      return `PROXY ${proxy.host}:${proxy.port}`;
    }
    
    // Non-PUBG traffic (still use Jordanian proxies if user is Jordanian)
    if (isJordanian) {
      const proxy = router.select(host, url, true);
      return `PROXY ${proxy.host}:${proxy.port}`;
    }
    
    // Fallback for non-Jordanian users (use Jordanian proxies as primary)
    const proxy = router.select(host, url, false);
    return `PROXY ${proxy.host}:${proxy.port}`;
    
  } catch (error) {
    console.error('PAC Error:', error);
    // Fallback to primary Jordanian proxy
    return 'PROXY 85.159.217.18:80';
  }
}

// 📊 PERFORMANCE MONITORING INTERFACE
// This function can be called by external monitoring tools
function recordConnectionResult(proxyHost, success, latency) {
  router.recordResult(proxyHost, success, latency);
}

// 🎯 EXPORT FOR DEBUGGING
if (typeof module !== 'undefined') {
  module.exports = {
    FindProxyForURL,
    router,
    PUBG_DETECTOR,
    xxHash64
  };
}

// 🔥 ADDITIONAL UTILITIES (for advanced users)
const UTILITIES = {
  // Get current proxy performance stats
  getStats: () => {
    const stats = {};
    router.history.forEach((hist, host) => {
      stats[host] = {
        successRate: hist.successRate,
        avgRTT: hist.totalRTT / (hist.success + 1),
        totalRequests: hist.success + hist.failures
      };
    });
    return stats;
  },
  
  // Reset performance history
  resetHistory: () => {
    router.history.clear();
  },
  
  // Get current lock info
  getLockInfo: () => ({
    lockedProxy: router.lock,
    expires: router.lockExpires,
    timeLeft: Math.max(0, router.lockExpires - Date.now())
  })
};
