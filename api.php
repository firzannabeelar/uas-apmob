<?php
error_reporting(0);
$host = "localhost";
$user = "root";
$pass = "raf123";
$db = "api_rn";
$koneksi = mysqli_connect($host, $user, $pass, $db);
$op = $_GET['op'];

switch ($op) {
    case '': normal(); break;
    default: normal(); break;
    case 'create': create(); break;
    case 'detail': detail(); break;
    case 'update': update(); break;
    case 'delete': delete(); break;
    case 'list_jobdesk': listJobdesk(); break;
    case 'assign_jobdesk': assignJobdesk(); break;
    case 'monitor_jobdesk': monitorAssignedJobdesks(); break;
    case 'complete_jobdesk': markJobdeskComplete(); break;
    case 'delete_assigned_jobdesk': deleteAssignedJobdesk(); break;
    case 'login': login(); break;
    case 'register': register(); break;
}

function normal() {
    global $koneksi;
    $sql1 = "SELECT * FROM mahasiswa ORDER BY id DESC";
    $q1 = mysqli_query($koneksi, $sql1);
    while ($r1 = mysqli_fetch_array($q1)) {
        $hasil[] = array(
            'id' => $r1['id'],
            'npm' => $r1['npm'],
            'nama' => $r1['nama'],
            'program_studi' => $r1['program_studi'],
            'tanggal_input' => $r1['tanggal_input']
        );
    }
    $data['data']['result'] = $hasil ?? [];
    echo json_encode($data);
}

function create() {
    global $koneksi;
    $npm = $_POST['npm'];
    $nama = $_POST['nama'];
    $program_studi = $_POST['program_studi'];
    $hasil = "Gagal dimasukkan data";
    if ($nama && $npm && $program_studi) {
        $sql1 = "INSERT INTO mahasiswa(npm, nama, program_studi) VALUES ('$npm', '$nama', '$program_studi')";
        $q1 = mysqli_query($koneksi, $sql1);
        if ($q1) {
            $hasil = "Berhasil menambahkan data";
        }
    }
    $data['data']['result'] = $hasil;
    echo json_encode($data);
}

function detail() {
    global $koneksi;
    $id = $_GET['id'];
    $sql1 = "SELECT * FROM mahasiswa WHERE id = '$id'";
    $q1 = mysqli_query($koneksi, $sql1);
    while ($r1 = mysqli_fetch_array($q1)) {
        $hasil[] = array(
            'id' => $r1['id'],
            'npm' => $r1['npm'],
            'nama' => $r1['nama'],
            'program_studi' => $r1['program_studi'],
            'tanggal_input' => $r1['tanggal_input']
        );
    }
    $data['data']['result'] = $hasil ?? [];
    echo json_encode($data);
}

function update() {
    global $koneksi;
    $id = $_GET['id'];
    $npm = $_POST['npm'];
    $nama = $_POST['nama'];
    $program_studi = $_POST['program_studi'];
    $tanggal_input = $_POST['tanggal_input'];
    if ($npm) {
        $set[] = "npm='$npm'";
    }
    if ($nama) {
        $set[] = "nama='$nama'";
    }
    if ($program_studi) {
        $set[] = "program_studi='$program_studi'";
    }
    $hasil = "Gagal melakukan update data";
    if ($set) {
        $sql1 = "UPDATE mahasiswa SET " . implode(",", $set) . ",tanggal_input=NOW() WHERE id = '$id'";
        $q1 = mysqli_query($koneksi, $sql1);
        if ($q1) {
            $hasil = "Data berhasil diupdate";
        }
    }
    $data['data']['result'] = $hasil;
    echo json_encode($data);
}

function delete() {
    global $koneksi;
    $id = $_GET['id'];
    $sql1 = "DELETE FROM mahasiswa WHERE id = '$id'";
    $q1 = mysqli_query($koneksi, $sql1);
    if ($q1) {
        $hasil = "Berhasil menghapus data";
    } else {
        $hasil = "Gagal menghapus data";
    }
    $data['data']['result'] = $hasil;
    echo json_encode($data);
}

function listJobdesk() {
    global $koneksi;
    $sql1 = "SELECT * FROM jobdesk";
    $q1 = mysqli_query($koneksi, $sql1);
    while ($r1 = mysqli_fetch_array($q1)) {
        $hasil[] = array(
            'id' => $r1['id'],
            'nama_jobdesk' => $r1['nama_jobdesk']
        );
    }
    $data['data']['result'] = $hasil ?? [];
    echo json_encode($data);
}

function assignJobdesk() {
    global $koneksi;
    $pegawai_id = $_POST['pegawai_id'];
    $jobdesk_id = $_POST['jobdesk_id'];
    $hasil = "Gagal menugaskan jobdesk";
    if ($pegawai_id && $jobdesk_id) {
        $sql1 = "INSERT INTO pegawai_jobdesk (pegawai_id, jobdesk_id) VALUES ('$pegawai_id', '$jobdesk_id')";
        $q1 = mysqli_query($koneksi, $sql1);
        if ($q1) {
            $hasil = "Jobdesk berhasil ditugaskan";
        }
    }
    $data['data']['result'] = $hasil;
    echo json_encode($data);
}

function monitorAssignedJobdesks() {
    global $koneksi;
    $sql = "SELECT aj.id, p.nama AS nama_pegawai, j.nama_jobdesk AS jobdesk, aj.status 
            FROM pegawai_jobdesk aj
            JOIN mahasiswa p ON aj.pegawai_id = p.id
            JOIN jobdesk j ON aj.jobdesk_id = j.id";
    $q1 = mysqli_query($koneksi, $sql);
    while ($r1 = mysqli_fetch_array($q1)) {
        $hasil[] = array(
            'id' => $r1['id'],
            'nama_pegawai' => $r1['nama_pegawai'],
            'jobdesk' => $r1['jobdesk'],
            'status' => $r1['status'] // 0: Belum selesai, 1: Selesai
        );
    }
    $data['data']['result'] = $hasil ?? [];
    echo json_encode($data);
}

function markJobdeskComplete() {
    global $koneksi;
    $id = $_GET['id'];
    $sql = "UPDATE pegawai_jobdesk SET status = '1' WHERE id = '$id'";
    $q1 = mysqli_query($koneksi, $sql);
    $hasil = $q1 ? "Jobdesk berhasil ditandai selesai" : "Gagal menandai selesai";
    $data['data']['result'] = $hasil;
    echo json_encode($data);
}

function deleteAssignedJobdesk() {
    global $koneksi;
    $id = $_GET['id'];
    $sql = "DELETE FROM pegawai_jobdesk WHERE id = '$id'";
    $q1 = mysqli_query($koneksi, $sql);
    $hasil = $q1 ? "Jobdesk berhasil dihapus" : "Gagal menghapus jobdesk";
    $data['data']['result'] = $hasil;
    echo json_encode($data);
}

function login() {
    global $koneksi;
    $username = $_POST['username'];
    $password = $_POST['password'];
    
    $sql = "SELECT * FROM users WHERE username = ?";
    $stmt = mysqli_prepare($koneksi, $sql);
    mysqli_stmt_bind_param($stmt, "s", $username);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    
    if ($row = mysqli_fetch_assoc($result)) {
        if (password_verify($password, $row['password'])) {
            $data['data']['result'] = array(
                'status' => 'success',
                'message' => 'Login berhasil',
                'user' => array(
                    'id' => $row['id'],
                    'username' => $row['username'],
                    'name' => $row['name']
                )
            );
        } else {
            $data['data']['result'] = array(
                'status' => 'error',
                'message' => 'Password salah'
            );
        }
    } else {
        $data['data']['result'] = array(
            'status' => 'error',
            'message' => 'Username tidak ditemukan'
        );
    }
    
    echo json_encode($data);
}

function register() {
    global $koneksi;
    $username = $_POST['username'];
    $password = $_POST['password'];
    $name = $_POST['name'];
    
    // Check if username already exists
    $check_sql = "SELECT id FROM users WHERE username = ?";
    $check_stmt = mysqli_prepare($koneksi, $check_sql);
    mysqli_stmt_bind_param($check_stmt, "s", $username);
    mysqli_stmt_execute($check_stmt);
    mysqli_stmt_store_result($check_stmt);
    
    if (mysqli_stmt_num_rows($check_stmt) > 0) {
        $data['data']['result'] = array(
            'status' => 'error',
            'message' => 'Username sudah digunakan'
        );
    } else {
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $sql = "INSERT INTO users (username, password, name) VALUES (?, ?, ?)";
        $stmt = mysqli_prepare($koneksi, $sql);
        mysqli_stmt_bind_param($stmt, "sss", $username, $hashed_password, $name);
        
        if (mysqli_stmt_execute($stmt)) {
            $data['data']['result'] = array(
                'status' => 'success',
                'message' => 'Registrasi berhasil'
            );
        } else {
            $data['data']['result'] = array(
                'status' => 'error',
                'message' => 'Registrasi gagal'
            );
        }
    }
    
    echo json_encode($data);
}

?>

